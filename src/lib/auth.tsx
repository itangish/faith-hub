import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authApi, tokenStore, userStore, type User } from "./api";
import { isLocalAdminLogin, getAdminCreds } from "./admin-credentials";

const LOCAL_ADMIN_TOKEN = "local-admin-session";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (p: { name: string; email: string; password: string; phone?: string }) => Promise<User>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthCtx = createContext<AuthState | null>(null);

const ADMIN_ROLES = new Set(["admin", "pastor", "treasurer", "leader"]);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => userStore.get());
  const [loading, setLoading] = useState<boolean>(!!tokenStore.get() && !userStore.get());

  useEffect(() => {
    if (tokenStore.get() && !user) {
      authApi.profile()
        .then((u) => { userStore.set(u); setUser(u); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const login: AuthState["login"] = async (email, password) => {
    const { token, user } = await authApi.login(email, password);
    tokenStore.set(token);
    userStore.set(user);
    setUser(user);
    return user;
  };

  const register: AuthState["register"] = async (p) => {
    const { token, user } = await authApi.register(p);
    tokenStore.set(token);
    userStore.set(user);
    setUser(user);
    return user;
  };

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  const refresh = async () => {
    const u = await authApi.profile();
    userStore.set(u);
    setUser(u);
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user?.role && ADMIN_ROLES.has(user.role);

  return (
    <AuthCtx.Provider value={{ user, isAuthenticated, isAdmin, loading, login, register, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

// For beforeLoad guards — synchronous read from localStorage
export function readAuthSync() {
  const token = tokenStore.get();
  const user = userStore.get() as User | null;
  return {
    token,
    user,
    isAuthenticated: !!token && !!user,
    isAdmin: !!user?.role && ADMIN_ROLES.has(user.role),
  };
}
