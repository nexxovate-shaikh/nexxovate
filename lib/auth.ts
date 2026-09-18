import jwt from "jsonwebtoken";
import { getUserByEmail } from "./users";
import { getJwtSecret } from "./jwt-secret";

/**
 * Node-runtime token handling. Route handlers that import this must declare
 * `export const runtime = "nodejs"` — jsonwebtoken cannot run on the Edge.
 * Middleware uses lib/auth-edge.ts instead.
 */

export type AdminTokenPayload = {
  email: string;
  role: string;
  tokenVersion: number;
};

/**
 * Sign an admin token.
 *
 * The algorithm is pinned. Without it a token could be presented with
 * alg: "none" and, depending on library version, be accepted.
 */
export function signToken(payload: AdminTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}

/**
 * Verify signature and expiry, then confirm the token has not been revoked.
 *
 * tokenVersion is bumped on the user record when sessions should be
 * invalidated (password reset, forced logout). A token carrying a stale
 * version is rejected even though its signature is valid.
 */
export async function verifyToken(
  token: string
): Promise<AdminTokenPayload | null> {
  let decoded: AdminTokenPayload;

  try {
    decoded = jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    }) as AdminTokenPayload;
  } catch {
    return null;
  }

  const user = await getUserByEmail(decoded.email);

  if (!user) return null;

  if (user.tokenVersion !== decoded.tokenVersion) return null;

  return decoded;
}
