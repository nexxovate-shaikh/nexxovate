import jwt from "jsonwebtoken";
import { getUserByEmail } from "./users";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret-change-in-production";

export type AdminTokenPayload = {
  email: string;
  role: string;
  tokenVersion: number;
};

/**
 * Sign JWT
 */
export function signToken(
  payload: AdminTokenPayload
) {

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

}

/**
 * Verify JWT
 */
export async function verifyToken(
  token: string
) {

  try {

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      ) as AdminTokenPayload;

    const user =
      await getUserByEmail(
        decoded.email
      );

    if (!user)
      return null;

    if (
      user.tokenVersion !==
      decoded.tokenVersion
    ) {
      return null;
    }

    return decoded;

  } catch {

    return null;

  }

}