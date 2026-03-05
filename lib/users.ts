export const dynamic = "force-dynamic";
import { getDB } from "./db";
import bcrypt from "bcryptjs";

export type User = {
  id?: string;
  email: string;
  password: string;
  role: "admin" | "client";
  name?: string;
  company?: string;
  createdAt?: Date;
  tokenVersion?: number;
};

/**
 * Create user (admin or client)
 */
export async function createUser(
  email: string,
  password: string,
  role: "admin" | "client" = "client",
  name?: string,
  company?: string
) {
  const db = await getDB();

  const existing = await db
    .collection("users")
    .findOne({ email });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const result = await db
    .collection("users")
    .insertOne({
      email,
      password: hashed,
      role,
      name,
      company,
      tokenVersion: 0,
      createdAt: new Date(),
    });

  return {
    id: result.insertedId.toString(),
    email,
    role,
  };
}

/**
 * Ensure default admin exists (AUTO RUN SAFE)
 */
export async function ensureAdminExists() {
  const db = await getDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("⚠️ ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
    return;
  }

  const existingAdmin = await db
    .collection("users")
    .findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 10);

    await db.collection("users").insertOne({
      email: adminEmail,
      password: hashed,
      role: "admin",
      tokenVersion: 0,
      createdAt: new Date(),
    });

    console.log("✅ Default admin created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDB();

  const user = await db
    .collection("users")
    .findOne({ email });

  if (!user) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
    role: user.role,
    name: user.name,
    company: user.company,
    tokenVersion: user.tokenVersion || 0,
    createdAt: user.createdAt,
  };
}

/**
 * Validate password (login)
 */
export async function validatePassword(
  email: string,
  password: string
) {
  const user = await getUserByEmail(email);

  if (!user) return null;

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion || 0,
  };
}