type AuditEntry = {
  email: string;
  action: string;
  time: Date;
};

const logs: AuditEntry[] = [];

export function logAction(email: string, action: string) {
  logs.push({
    email,
    action,
    time: new Date(),
  });
}

export function getLogs() {
  return logs;
}