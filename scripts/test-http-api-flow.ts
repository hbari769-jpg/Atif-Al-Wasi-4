/**
 * End-to-End HTTP API Integration Test for Registration & Verification Flow
 */

import fs from 'fs';

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

function getDatabaseUsers(): any[] {
  try {
    const raw = fs.readFileSync('database.json', 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch {
    return [];
  }
}

async function runHttpTests() {
  console.log('\n======================================================');
  console.log('HTTP API END-TO-END VERIFICATION FLOW TESTS');
  console.log('======================================================\n');

  // Wait 1.5 seconds for dev server ready
  await new Promise((r) => setTimeout(r, 1500));

  const testEmail = `live-test-${Date.now()}@domain.com`;
  const password = 'SuperSecretPassword99!';

  // Step 1: Register brand-new email
  console.log('--- Step 1: POST /api/auth/register ---');
  const regRes = await fetch('http://127.0.0.1:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'E2E Tester',
      email: testEmail,
      password,
      confirmPassword: password,
    }),
  });

  const regData = await regRes.json();
  console.log(`  Registration HTTP status: ${regRes.status}`);
  console.log(`  Registration response: ${JSON.stringify(regData)}`);

  assert(regRes.status === 503, 'Registration returns HTTP 503 when email provider authentication fails');
  assert(regData.code === 'EMAIL_DELIVERY_FAILED', 'Response includes code: EMAIL_DELIVERY_FAILED');
  assert(regData.requiresVerification === true, 'Response specifies requiresVerification: true');
  assert(
    regData.error?.includes('Email provider authentication failed') || regData.error?.includes('Brevo authentication failed') || regData.error?.includes('Key not found'),
    'Sanitized provider error informs user of provider authentication failure without secrets'
  );

  // Check database file on disk
  const usersOnDisk = getDatabaseUsers();
  const dbUser = usersOnDisk.find((u) => u.email === testEmail);
  assert(Boolean(dbUser), 'Account was created and persisted to database.json');
  assert(dbUser?.isEmailVerified === false, 'CRITICAL SECURITY: Account is NOT marked verified when delivery fails');

  // Step 2: Login attempt with unverified account
  console.log('\n--- Step 2: POST /api/auth/login (Unverified Account) ---');
  const loginRes = await fetch('http://127.0.0.1:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password,
    }),
  });

  const loginData = await loginRes.json();
  console.log(`  Login HTTP status: ${loginRes.status}`);
  console.log(`  Login response: ${JSON.stringify(loginData)}`);

  assert(loginRes.status === 403, 'Login returns HTTP 403 for unverified accounts');
  assert(loginData.requiresVerification === true, 'Login response has requiresVerification: true');
  assert(loginData.code === 'EMAIL_NOT_VERIFIED', 'Login response has code: EMAIL_NOT_VERIFIED');

  // Verify account was NOT auto-verified by login
  const usersAfterLogin = getDatabaseUsers();
  const userAfterLogin = usersAfterLogin.find((u) => u.email === testEmail);
  assert(userAfterLogin?.isEmailVerified === false, 'Login does NOT bypass verification or auto-verify account');

  // Step 3: Resend verification immediately (should hit 60s cooldown)
  console.log('\n--- Step 3: POST /api/auth/resend-verification (Cooldown Check) ---');
  const resendRes = await fetch('http://127.0.0.1:3000/api/auth/resend-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail }),
  });

  const resendData = await resendRes.json();
  console.log(`  Resend HTTP status: ${resendRes.status}`);
  console.log(`  Resend response: ${JSON.stringify(resendData)}`);

  assert(resendRes.status === 429, 'Immediate resend returns HTTP 429 Rate Limited (60s cooldown enforced)');
  assert(resendData.code === 'EMAIL_RATE_LIMITED', 'Resend error code is EMAIL_RATE_LIMITED');

  // Step 4: Verify email with invalid code
  console.log('\n--- Step 4: POST /api/auth/verify-email (Invalid Code) ---');
  const badVerifyRes = await fetch('http://127.0.0.1:3000/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      code: '111111',
    }),
  });

  const badVerifyData = await badVerifyRes.json();
  assert(badVerifyRes.status === 400, 'Invalid code returns HTTP 400');
  assert(badVerifyData.error?.includes('Invalid verification code'), 'Error explains code is invalid');

  // Clean up test account from database.json
  try {
    const raw = fs.readFileSync('database.json', 'utf-8');
    const parsed = JSON.parse(raw);
    parsed.users = (parsed.users || []).filter((u: any) => u.email !== testEmail);
    fs.writeFileSync('database.json', JSON.stringify(parsed, null, 2), 'utf-8');
  } catch {}

  console.log('\n======================================================');
  console.log(`HTTP E2E TESTS COMPLETE: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runHttpTests().catch((e) => {
  console.error('HTTP test suite failed:', e);
  process.exit(1);
});
