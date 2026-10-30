import assert from 'assert';
import { db } from '../server/db.js';

const BASE_URL = 'http://localhost:3000';
const ANNOUNCEMENT_KEY = 'aestific_enhance_launch';

async function runTests() {
  console.log('🧪 Starting Aestific Enhance Announcement Verification Suite...\n');

  // Test 1: Verify landing page HTTP output does NOT contain the announcement modal markup
  console.log('1. Checking landing page does not render announcement...');
  const landingRes = await fetch(`${BASE_URL}/`);
  assert.strictEqual(landingRes.status, 200);
  const landingHtml = await landingRes.text();
  assert.strictEqual(landingHtml.includes('Aestific Enhance Announcement'), false, 'Landing page must not contain announcement markup');
  console.log('   ✅ Landing page verified clean.');

  // Test 2: Check announcement status endpoint returns expected structure for fresh guest
  console.log('\n2. Testing announcement status for first-time guest session...');
  const freshGuestId = 'guest_test_' + Date.now();
  const guestStatusRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: { 'x-guest-id': freshGuestId },
  });
  assert.strictEqual(guestStatusRes.status, 200);
  const guestStatus = await guestStatusRes.json();
  assert.strictEqual(guestStatus.key, ANNOUNCEMENT_KEY);
  assert.strictEqual(guestStatus.identityType, 'guest');
  assert.strictEqual(guestStatus.identityId, freshGuestId);
  assert.strictEqual(guestStatus.shown, false);
  assert.strictEqual(guestStatus.dismissed, false);
  assert.strictEqual(guestStatus.shouldShow, true, 'First-time guest must be eligible to see announcement');
  assert.ok(guestStatus.imageUrl, 'Must return direct image URL');
  console.log('   ✅ First-time guest is eligible (shouldShow: true).');

  // Test 3: Mark shown for the guest
  console.log('\n3. Testing marking announcement as shown for guest...');
  const markShownRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/shown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-guest-id': freshGuestId,
    },
    body: JSON.stringify({ guestId: freshGuestId }),
  });
  assert.strictEqual(markShownRes.status, 200);
  const markShownData = await markShownRes.json();
  assert.strictEqual(markShownData.shown, true);
  console.log('   ✅ Announcement marked as shown.');

  // Test 4: Persistent guest session does not see it again after returning
  console.log('\n4. Verifying persistent guest session does not see it again after refresh/return...');
  const returningGuestRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: { 'x-guest-id': freshGuestId },
  });
  const returningStatus = await returningGuestRes.json();
  assert.strictEqual(returningStatus.shown, true);
  assert.strictEqual(returningStatus.shouldShow, false, 'Returning guest session must NOT be shown again');
  console.log('   ✅ Returning guest receives shouldShow: false.');

  // Test 5: Dismissing announcement updates dismissed state
  console.log('\n5. Testing dismiss endpoint...');
  const dismissRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/dismiss`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-guest-id': freshGuestId,
    },
    body: JSON.stringify({ guestId: freshGuestId }),
  });
  assert.strictEqual(dismissRes.status, 200);
  const dismissData = await dismissRes.json();
  assert.strictEqual(dismissData.dismissed, true);
  console.log('   ✅ Announcement marked as dismissed.');

  // Test 6: A different independent guest identity CAN see it once
  console.log('\n6. Testing independent guest identity can see announcement...');
  const otherGuestId = 'guest_other_' + Date.now();
  const otherGuestRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: { 'x-guest-id': otherGuestId },
  });
  const otherGuestStatus = await otherGuestRes.json();
  assert.strictEqual(otherGuestStatus.identityId, otherGuestId);
  assert.strictEqual(otherGuestStatus.shouldShow, true, 'Independent guest must receive shouldShow: true');
  console.log('   ✅ Independent guest receives shouldShow: true.');

  // Test 7: Registered user authentication flow & cross-device persistence
  console.log('\n7. Testing registered user account announcement lifecycle...');
  const testEmail = `test_announcement_${Date.now()}@gmail.com`;
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Announcement Test User',
      email: testEmail,
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!',
    }),
  });
  assert.strictEqual(regRes.status, 201);
  const regData = await regRes.json();
  const token = regData.token;
  assert.ok(token, 'Must return auth token');
  const userId = regData.user.id;

  // Check first-time registered user status on Device 1
  const userStatusRes1 = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userStatus1 = await userStatusRes1.json();
  assert.strictEqual(userStatus1.identityType, 'user');
  assert.strictEqual(userStatus1.identityId, userId);
  assert.strictEqual(userStatus1.shouldShow, true, 'First-time registered user must be eligible to see announcement');
  console.log('   ✅ First-time registered user receives shouldShow: true.');

  // Mark shown for registered user on Device 1
  const userShownRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/shown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  assert.strictEqual(userShownRes.status, 200);

  // Dismiss for registered user on Device 1
  const userDismissRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/dismiss`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  assert.strictEqual(userDismissRes.status, 200);

  // Check from simulated Device 2 with the same account (different headers, no cookies from Device 1)
  console.log('\n8. Verifying cross-device sync for registered user (simulated Device 2)...');
  const userStatusRes2 = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    },
  });
  const userStatus2 = await userStatusRes2.json();
  assert.strictEqual(userStatus2.identityId, userId);
  assert.strictEqual(userStatus2.shown, true);
  assert.strictEqual(userStatus2.dismissed, true);
  assert.strictEqual(userStatus2.shouldShow, false, 'Same registered account on second device must NOT see announcement');
  console.log('   ✅ Device 2 correctly receives shouldShow: false across devices.');

  // Test 9: Guest-to-User identity merging policy
  console.log('\n9. Testing Guest-to-User conversion identity merging...');
  const convertingGuestId = 'guest_conv_' + Date.now();
  // Guest sees announcement
  await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/shown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-guest-id': convertingGuestId,
    },
    body: JSON.stringify({ guestId: convertingGuestId }),
  });
  await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/dismiss`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-guest-id': convertingGuestId,
    },
    body: JSON.stringify({ guestId: convertingGuestId }),
  });

  // Now guest creates an account or logs in with x-guest-id
  const convertedEmail = `converted_user_${Date.now()}@gmail.com`;
  const convRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Converted User',
      email: convertedEmail,
      password: 'StrongPassword123!',
      confirmPassword: 'StrongPassword123!',
    }),
  });
  const convRegData = await convRegRes.json();
  const convToken = convRegData.token;

  // When check status is called with x-guest-id, it merges and does not show again
  const mergedStatusRes = await fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/status`, {
    headers: {
      Authorization: `Bearer ${convToken}`,
      'x-guest-id': convertingGuestId,
    },
  });
  const mergedStatus = await mergedStatusRes.json();
  assert.strictEqual(mergedStatus.shouldShow, false, 'Guest who already saw announcement must NOT see it again after signing in');
  console.log('   ✅ Converted user does not see announcement again after signing in.');

  // Test 10: Verify image asset accessibility
  console.log('\n10. Testing direct image asset reachability...');
  const imgRes = await fetch('https://i.ibb.co.com/N6KFPScz/Aestific-Enhance-Cloud-UI-Poster.png', { method: 'HEAD' });
  assert.strictEqual(imgRes.status, 200);
  assert.ok(imgRes.headers.get('content-type')?.includes('image/'), 'Must be an image MIME type');
  console.log('   ✅ Direct image asset is live, accessible, and returns image/png.');

  // Test 11: Concurrency and Idempotence
  console.log('\n11. Testing concurrent shown/dismiss requests...');
  const concurrentGuestId = 'guest_concurrent_' + Date.now();
  const promises = Array.from({ length: 5 }, () =>
    fetch(`${BASE_URL}/api/announcements/${ANNOUNCEMENT_KEY}/shown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-guest-id': concurrentGuestId,
      },
      body: JSON.stringify({ guestId: concurrentGuestId }),
    })
  );
  const results = await Promise.all(promises);
  for (const r of results) {
    assert.strictEqual(r.status, 200, 'All concurrent requests must succeed idempotently');
  }
  console.log('   ✅ All 5 concurrent shown requests handled idempotently.');

  // Test 12: Existing chat and health remain intact
  console.log('\n12. Verifying existing system health and conversations API remain intact...');
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  assert.strictEqual(healthRes.status, 200);
  const healthData = await healthRes.json();
  assert.strictEqual(healthData.status, 'ok');

  const convsRes = await fetch(`${BASE_URL}/api/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.strictEqual(convsRes.status, 200);
  console.log('   ✅ Health check and conversations API operational.');

  console.log('\n🎉 ALL 12 VERIFICATION SCENARIOS PASSED WITH ZERO ERRORS!\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
