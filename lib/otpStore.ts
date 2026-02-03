import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

/* ---------------- GENERATE OTP ---------------- */
export async function generateOTP(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // store OTP in Redis with 5 min expiry
  await redis.set(`otp:${email}`, code, { ex: 300 });

  console.log("OTP for", email, "=", code);

  return code;
}

/* ---------------- VERIFY OTP ---------------- */
export async function verifyOTP(email: string, input: string) {
  const stored = await redis.get<string>(`otp:${email}`);

  if (!stored) return false;

  return stored === input;
}
