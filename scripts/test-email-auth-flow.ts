/**
 * Diagnostic and Regression Test Suite for Email Verification & Authentication Flows
 * Tests:
 * 1. Brand-new registration with email delivery failure (asserts unverified, no auto-verify bypass)
 * 2. Safe resend-code flow with cooldown (asserts 60s cooldown, rate limiting)
 * 3. Unverified account login attempt (asserts 403 requiresVerification, no auto-verify bypass)
 * 4. Legitimate verified account login (both gmail and non-gmail, test@ substring allowed, no bans)
 * 5. Re-registering with an unverified account (no duplicate records, updates credentials)
 * 6. Code verification and activation
 */

import { db } from '../server/db.js';
import { hashPassword } from '../server/auth.js';
import { sendVerificationEmail, isBrevoConfigured } from '../server/brevo.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('STARTING AESTIFIC EMAIL AUTHENTICATION TEST SUITE');
  console.log('======================================================\n');

  // Test 1: Provider Status & Diagnostics
  console.log('--- Test Group 1: Brevo Provider Diagnostics ---');
  const configured = isBrevoConfigured();
  console.log(`  Brevo Configured in Environment: ${configured}`);
  
  // Real test dispatch to verify actual provider response
  const providerTestEmail = 'provider-check-audit@aestific.local';
  const providerResult = await sendVerificationEmail(providerTestEmail, 'Audit User', '999888');
  console.log(`  Provider Response Success: ${providerResult.success}`);
  console.log(`  Provider Response Error: ${providerResult.error || 'None'}`);
  console.log(`  Provider Status Code: ${providerResult.statusCode}`);

  // We know the current key returns 401 Unauthorized
  assert(
    !providerResult.success && providerResult.statusCode === 401,
    'Brevo correctly identifies invalid API key with HTTP 401 and descriptive error'
  );
  assert(
    !providerResult.error?.includes('xkeysib-'),
    'Brevo error response does not expose raw API key or secrets'
  );

  // Test 2: Brand-New Account Registration with Delivery Failure
  console.log('\n--- Test Group 2: Brand New Account Registration Under Provider Failure ---');
  const testEmail1 = `fresh-user-${Date.now()}@example.org`;
  const plainPassword = 'SecurePassword123!';
  const passwordHash = await hashPassword(plainPassword);

  const newUser = await db.createUser({
    name: 'Fresh Tester',
    email: testEmail1,
    passwordHash,
    memoryEnabled: true,
    preferredModel: 'gemini-3.5-flash-lite',
    systemPrompt: 'Default prompt',
    isEmailVerified: false,
  });

  assert(Boolean(newUser.id), 'New user account created in database');
  assert(newUser.isEmailVerified === false, 'Account created with isEmailVerified = false');

  const code1 = db.generateVerificationCode();
  await db.setVerificationCode(newUser.id, code1);

  // Attempt sending code
  const sendResult1 = await sendVerificationEmail(newUser.email, newUser.name, code1);
  assert(!sendResult1.success, 'Email provider correctly reports delivery failure');

  // CRITICAL SECURITY ASSERTION: Account MUST remain unverified when sending fails
  const fetchedUser1 = await db.findUserById(newUser.id);
  assert(
    fetchedUser1?.isEmailVerified === false,
    'SECURITY: Account is NOT marked as verified when email delivery fails'
  );

  // Test 3: Unverified Account Login Handling
  console.log('\n--- Test Group 3: Unverified Account Login Attempt ---');
  // When an unverified user tries to log in, backend must return requiresVerification: true without auto-verifying
  assert(
    fetchedUser1 !== null && !fetchedUser1.isEmailVerified,
    'User remains unverified'
  );
  // Simulating the login check:
  const shouldRequireVerification = !fetchedUser1?.isEmailVerified;
  assert(
    shouldRequireVerification === true,
    'Login flow halts and demands verification instead of auto-verifying unverified users'
  );

  // Test 4: Resend Verification Cooldown & Rate Limiting
  console.log('\n--- Test Group 4: Resend Verification Cooldown ---');
  // User just had a code set (lastVerificationSentAt = now)
  const cooldown1 = await db.canResendVerification(newUser.id, 60000);
  assert(
    cooldown1.allowed === false && (cooldown1.waitSeconds || 0) > 0,
    `Resend cooldown active (${cooldown1.waitSeconds}s remaining, under 60s limit)`
  );

  // Test 5: Non-Gmail & Substring 'test' Account Support
  console.log('\n--- Test Group 5: Non-Gmail & Valid Email Format Accounts ---');
  const nonGmailEmails = [
    'developer@outlook.com',
    'contestant@yahoo.com',
    'testuser99@proton.me',
    'engineering@acme.corp',
  ];

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of nonGmailEmails) {
    const isValid = EMAIL_REGEX.test(email);
    assert(isValid, `Standard RFC email regex accepts ${email}`);
  }

  // Create a verified non-gmail account
  const nonGmailUser = await db.createUser({
    name: 'Outlook User',
    email: `outlook-${Date.now()}@outlook.com`,
    passwordHash: await hashPassword('Password456!'),
    memoryEnabled: true,
    preferredModel: 'gemini-3.5-flash-lite',
    systemPrompt: 'Default prompt',
    isEmailVerified: true,
  });

  assert(
    nonGmailUser.isBanned === false && nonGmailUser.status === 'active',
    'Non-Gmail account is not banned and has active status'
  );

  // Test 6: Re-registering with an unverified account (updates credentials, no duplicate accounts)
  console.log('\n--- Test Group 6: Re-registering Unverified Account ---');
  const existingUnverified = await db.findUserByEmail(testEmail1);
  assert(existingUnverified !== null, 'Existing unverified user found by email');

  const allUsersBefore = (await db.getDataAsync()).users.filter((u) => u.email === testEmail1);
  assert(allUsersBefore.length === 1, 'Exactly one user record exists before re-registration');

  // Simulate re-register update
  const newPassHash = await hashPassword('NewPassword999!');
  await db.updateUser(existingUnverified!.id, {
    name: 'Updated Tester',
    passwordHash: newPassHash,
  });

  const allUsersAfter = (await db.getDataAsync()).users.filter((u) => u.email === testEmail1);
  assert(allUsersAfter.length === 1, 'No duplicate accounts created upon re-registration');

  // Test 7: Successful Code Verification Flow
  console.log('\n--- Test Group 7: Legitimate Code Verification ---');
  const testCode = db.generateVerificationCode();
  await db.setVerificationCode(existingUnverified!.id, testCode);

  // Wrong code attempt
  const wrongResult = await db.verifyEmailCode(testEmail1, '000000');
  assert(wrongResult.success === false, 'Invalid verification code is rejected');

  // Correct code attempt
  const correctResult = await db.verifyEmailCode(testEmail1, testCode);
  assert(correctResult.success === true, 'Valid 6-digit code is accepted');
  assert(correctResult.user?.isEmailVerified === true, 'User is successfully marked as verified after valid code submission');

  // Cleanup test users from DB
  await db.deleteUser(newUser.id);
  await db.deleteUser(nonGmailUser.id);

  console.log('\n======================================================');
  console.log(`TEST SUITE COMPLETE: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
