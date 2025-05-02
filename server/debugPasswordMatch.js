const bcrypt = require('bcryptjs');

async function testHashes() {
  const testCases = [
    { password: 'Secure@Admin123', hash: '$2a$12$INbuBFbINk4vyidJ.a5QpOD0NmzAAp9Vj9/lMRyI/mJSvmvx.JVLK' },
    { password: 'Warden@Office456', hash: '$2a$12$dvvJZ6J7X8Y9z0a1b2c3d.4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u' },
    { password: 'Mess@Super789', hash: '$2a$12$3Qx7J9VtT6hYrLkDpF.8E.9qXz1cBvC2dG3hY4nM5lK6jH7iN8oP' }
  ];

  for (const { password, hash } of testCases) {
    const match = await bcrypt.compare(password, hash);
    console.log(`Password "${password}" matches hash: ${match}`);
  }
}

testHashes();