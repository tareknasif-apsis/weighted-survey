// Mock admin auth for the prototype. Replace with real authenticated
// sessions (backend-verified) before this goes anywhere near production.

export type AdminRole = "Super Admin" | "Reviewer";

export type AdminUser = {
  username: string;
  password: string;
  role: AdminRole;
  displayName: string;
};

const ADMIN_USERS: AdminUser[] = [
  {
    username: "admin",
    password: "admin123",
    role: "Super Admin",
    displayName: "MNEXT Admin",
  },
  {
    username: "reviewer",
    password: "reviewer123",
    role: "Reviewer",
    displayName: "MNEXT Reviewer",
  },
];

export type AdminSession = {
  username: string;
  role: AdminRole;
  displayName: string;
  loginAt: string;
};

const SESSION_KEY = "mnext_admin_session";

export function login(username: string, password: string): AdminSession | null {
  const user = ADMIN_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password,
  );
  if (!user) return null;
  const session: AdminSession = {
    username: user.username,
    role: user.role,
    displayName: user.displayName,
    loginAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return session;
}

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}
