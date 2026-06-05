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

// Normalize common gmail typos (gmil, gmai, gmial, gmaill, gmail.co) so a
// small slip on the default admin email still signs in.
function normalizeEmail(raw: string): string {
  let e = raw.trim().toLowerCase();
  e = e.replace(/@(gmil|gmai|gmial|gmaill|gnail|gmali)\.com$/, "@gmail.com");
  e = e.replace(/@gmail\.(co|cm|con|comm)$/, "@gmail.com");
  return e;
}

export function isLocalAdminLogin(email: string, password: string): boolean {
  const c = getAdminCreds();
  return normalizeEmail(email) === normalizeEmail(c.email) && password === c.password;
}
