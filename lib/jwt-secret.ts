/**
 * Single source of truth for the admin JWT signing secret.
 *
 * Previously lib/auth.ts fell back to the literal string
 * "dev-secret-change-in-production" when JWT_SECRET was unset. That string is
 * committed to this repository, so any deployment missing the environment
 * variable could have admin tokens forged against it by anyone reading the
 * source. There is no fallback any more.
 *
 * The check is lazy rather than at module scope on purpose: a throw at import
 * time would take down the whole app (middleware included) at build. Instead
 * each caller fails closed at request time with a message that says what to do.
 *
 * Generate a value with:
 *   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
 */

const MIN_LENGTH = 32;

const MESSAGE =
  `JWT_SECRET is missing or shorter than ${MIN_LENGTH} characters. ` +
  `Admin authentication is disabled until it is set. Generate one with: ` +
  `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`;

let cachedBytes: Uint8Array | null = null;

/** Throws if JWT_SECRET is unset or too weak. */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < MIN_LENGTH) {
    throw new Error(MESSAGE);
  }

  return secret;
}

/** Same value as Uint8Array, for `jose` on the Edge runtime. */
export function getJwtSecretBytes(): Uint8Array {
  if (!cachedBytes) {
    cachedBytes = new TextEncoder().encode(getJwtSecret());
  }
  return cachedBytes;
}

/** Non-throwing probe, for logging a clear reason before failing closed. */
export function isJwtSecretConfigured(): boolean {
  const secret = process.env.JWT_SECRET;
  return Boolean(secret && secret.length >= MIN_LENGTH);
}
