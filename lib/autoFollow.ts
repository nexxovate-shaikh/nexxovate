export function nextFollowUp(hours = 24) {
  return new Date(Date.now() + hours * 3600000);
}
