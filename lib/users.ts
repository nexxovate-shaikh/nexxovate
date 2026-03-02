export type User = {
  email: string;
  password: string;
  role: string;
  tokenVersion: number;
};

/**
 * Temporary in-memory users
 * Later we connect database
 */
const users: User[] = [
  {
    email: "admin@nexxovate.com",
    password: "admin123",
    role: "admin",
    tokenVersion: 0,
  },
];


/**
 * FIND USER BY EMAIL
 */
export function getUserByEmail(email: string): User | null {

  const user = users.find(
    (u) => u.email === email
  );

  return user || null;

}


/**
 * ADMIN alias (for auth.ts compatibility)
 */
export function getAdminByEmail(email: string): User | null {

  return getUserByEmail(email);

}


/**
 * REGISTER NEW USER
 */
export function createUser(
  email: string,
  password: string,
  role: string = "client"
): User {

  const existing =
    getUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const user: User = {
    email,
    password,
    role,
    tokenVersion: 0,
  };

  users.push(user);

  return user;

}


/**
 * FIND USER (alias)
 */
export function findUser(email: string) {

  return getUserByEmail(email);

}