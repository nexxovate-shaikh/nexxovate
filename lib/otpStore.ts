import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export async function generateOTP(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set(`otp:${email}`, code, { ex: 300 }); // 5 minutes

  console.log("OTP for", email, "=", code);

  return code;
}

export async function verifyOTP(email: string, input: string) {
  const stored = await redis.get<string>(`otp:${email}`);

  return stored === input;
}
