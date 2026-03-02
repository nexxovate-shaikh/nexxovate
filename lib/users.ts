export type AdminUser = {
  email: string;
  password: string;
  role: string;
  tokenVersion: number;
};

const admins: AdminUser[] = [
  {
    email: "admin@nexxovate.com",
    password: "admin123",
    role: "admin",
    tokenVersion: 0,
  },
];

/**
 * Find admin by email
 */
export function getAdminByEmail(email: string): AdminUser | null {

  const admin = admins.find(
    (a) => a.email === email
  );

  return admin || null;

}