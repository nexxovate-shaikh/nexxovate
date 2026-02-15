import bcrypt from "bcryptjs";

export type Role = "admin" | "staff";

export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};

const users: User[] = [];

export async function createUser(email: string, password: string, role: Role) {
  const hashed = await bcrypt.hash(password, 10);

  const user: User = {
    id: crypto.randomUUID(),
    email,
    password: hashed,
    role,
  };

  users.push(user);
  return user;
}

export async function findUser(email: string) {
  return users.find((u) => u.email === email);
}

export function listUsers() {
  return users;
}
