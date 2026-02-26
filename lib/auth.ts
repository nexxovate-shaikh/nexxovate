import jwt from "jsonwebtoken";
import { getAdminByEmail } from "./users";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export type AdminTokenPayload = {
  email: string;
  role: string;
  tokenVersion: number;
};

export function signToken(payload: AdminTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;

    const admin = getAdminByEmail(decoded.email);

    if (!admin) return null;

    if (admin.tokenVersion !== decoded.tokenVersion) {
      return null; // token invalidated
    }

    return decoded;
  } catch {
    return null;
  }
}