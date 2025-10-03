// Generate or retrieve user UID
export function getUserId(): string {
  const UID_KEY = 'user_uid';
  let uid = localStorage.getItem(UID_KEY);

  if (!uid) {
    // Generate a simple UID: timestamp + random string
    uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(UID_KEY, uid);
  }

  return uid;
}

// Check if current user is blocked
export function isUserBlocked(): boolean {
  const blockedUids = import.meta.env.VITE_BLOCKED_UIDS;
  if (!blockedUids) return false;

  const currentUid = getUserId();
  const blockedList = blockedUids.split(',').map((uid: string) => uid.trim());
  return blockedList.includes(currentUid);
}
