import axios from "axios";

const API_BASE =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
  "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

const TOKEN_KEY = "kyb_token";
const USER_KEY = "kyb_user";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const userStore = {
  get: () => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set: (u: unknown) => localStorage.setItem(USER_KEY, JSON.stringify(u)),
};

api.interceptors.request.use((config) => {
  const t = tokenStore.get();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      tokenStore.clear();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export type User = {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  status?: string;
  photo?: string;
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: User }>("/auth/login", { email, password }).then((r) => r.data),
  register: (payload: { name: string; email: string; password: string; phone?: string }) =>
    api.post<{ token: string; user: User }>("/auth/register", payload).then((r) => r.data),
  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }).then((r) => r.data),
  profile: () => api.get<{ user: User }>("/auth/profile").then((r) => r.data.user),
};

export const dashboardApi = {
  get: () => api.get("/dashboard").then((r) => r.data),
};
