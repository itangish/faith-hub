// Local default admin credentials (frontend fallback when the MongoDB API
// is unreachable). The admin can change these after signing in.

const KEY = "kyb_admin_credentials";

export const DEFAULT_ADMIN_EMAIL = "itangishakamoses63@gmail.com";
export const DEFAULT_ADMIN_PASSWORD = "Moses@1234";

export type AdminCreds = { email: string; password: string };

export function getAdminCreds(): AdminCreds {
  if (typeof window === "undefined") {
    return { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as AdminCreds;
  } catch {}
  return { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
}

export function setAdminCreds(creds: AdminCreds) {
  localStorage.setItem(KEY, JSON.stringify(creds));
}

export function isLocalAdminLogin(email: string, password: string): boolean {
  const c = getAdminCreds();
  return email.trim().toLowerCase() === c.email.trim().toLowerCase() && password === c.password;
}
