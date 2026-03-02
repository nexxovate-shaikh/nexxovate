export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
  tokenVersion: number;
};

const users: User[] = [];

/** create new user/admin */
export function createUser(
  email: string,
  password: string,
  role?: string
): User {
  const exists = users.find((u) => u.email === email);

  if (exists) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    password,
    role: role ?? "staff",
    tokenVersion: 0,
  };

  users.push(user);

  return user;
}

/** find user */
export function findUser(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

/** used by auth */
export function getAdminByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

/** optional: invalidate tokens */
export function incrementTokenVersion(email: string) {
  const user = users.find((u) => u.email === email);
  if (user) {
    user.tokenVersion++;
  }
}