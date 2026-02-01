type OTPEntry = {
  code: string;
  expires: number;
};

const store: Map<string, OTPEntry> =
  globalThis.otpStore || new Map();

globalThis.otpStore = store;

export function generateOTP(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  store.set(email, {
    code,
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  console.log("OTP for", email, "=", code); // debug

  return code;
}

export function verifyOTP(email: string, input: string) {
  const entry = store.get(email);

  if (!entry) return false;
  if (Date.now() > entry.expires) return false;

  return entry.code === input;
}
