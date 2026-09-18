/**
 * Edge-runtime-safe token verification.
 *
 * `jsonwebtoken` (used in lib/auth.ts) depends on Node built-ins and cannot run
 * in middleware, which is almost certainly why middleware.ts was only testing
 * whether the cookie existed. `jose` is Web Crypto based and runs on the Edge,
 * so middleware can now check the signature properly.
 *
 * Deliberate split of responsibility:
 *
 *   middleware (here)  — verifies signature + expiry. Cheap, no I/O, runs on
 *                        every /admin request. Cannot check tokenVersion,
 *                        because that needs a database round trip.
 *
 *   lib/auth.ts        — verifies signature + expiry + tokenVersion against
 *                        MongoDB. Runs in Node route handlers, so revoked
 *                        tokens are rejected there.
 *
 * A revoked-but-unexpired token therefore gets past middleware and is stopped
 * at the first API call. That is the correct trade: middleware gates cheaply,
 * the data layer gates authoritatively. Nothing sensitive is served by the
 * page shell alone.
 */

import { jwtVerify } from "jose";
import { getJwtSecretBytes } from "./jwt-secret";

export type AdminTokenPayload = {
  email: string;
  role: string;
  tokenVersion: number;
};

export async function verifyTokenEdge(
  token: string
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretBytes(), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }

    return {
      email: payload.email,
      role: payload.role,
      tokenVersion: Number(payload.tokenVersion ?? 0),
    };
  } catch {
    // Bad signature, expired, malformed, or JWT_SECRET unset — all fail closed.
    return null;
  }
}
