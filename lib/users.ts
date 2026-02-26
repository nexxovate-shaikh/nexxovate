export type AdminRole = "superadmin" | "admin" | "staff";

export type AdminAccount = {
  id: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  tokenVersion: number;
};

const admins: AdminAccount[] = [];

export function getAdminByEmail(email: string) {
  return admins.find(a => a.email === email);
}

export function addAdmin(admin: AdminAccount) {
  admins.push(admin);
}

export function incrementTokenVersion(email: string) {
  const admin = getAdminByEmail(email);
  if (admin) {
    admin.tokenVersion++;
  }
}