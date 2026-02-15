import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AdminUser = {
  email: string;
  role: "admin" | "staff";
};

export function signToken(user: AdminUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}
