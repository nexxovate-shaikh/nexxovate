import jwt from "jsonwebtoken";
import { getAdminByEmail } from "./users";

/**
 * Use env secret in production
 * fallback for local/dev so build never crashes
 */
const JWT_SECRET =
  process.env.JWT_SECRET || "dev-secret-change-in-production";

export type AdminTokenPayload = {
  email: string;
  role: string;
  tokenVersion: number;
};

/**
 * Sign admin JWT
 */
export function signToken(payload: AdminTokenPayload) {

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

}

/**
 * Verify admin JWT
 */
export function verifyToken(token: string) {

  try {

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      ) as AdminTokenPayload;

    const admin =
      getAdminByEmail(decoded.email);

    if (!admin) return null;

    if (
      admin.tokenVersion !==
      decoded.tokenVersion
    ) {
      return null;
    }

    return decoded;

  } catch {

    return null;

  }

}