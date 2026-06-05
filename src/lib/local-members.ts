// Local member store — fallback when MongoDB API is unreachable so members
// can register and sign in directly from the frontend during development.

const KEY = "kyb_local_members";

export type LocalMember = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "member";
  status: "approved";
  createdAt: string;
};

function readAll(): LocalMember[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAll(list: LocalMember[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export const localMembers = {
  findByEmail: (email: string) =>
    readAll().find((m) => m.email.toLowerCase() === email.trim().toLowerCase()) || null,
  create: (input: { name: string; email: string; password: string; phone?: string }) => {
    const list = readAll();
    if (list.some((m) => m.email.toLowerCase() === input.email.trim().toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const member: LocalMember = {
      _id: `local-${Date.now()}`,
      name: input.name,
      email: input.email.trim(),
      phone: input.phone,
      password: input.password,
      role: "member",
      status: "approved",
      createdAt: new Date().toISOString(),
    };
    list.push(member);
    writeAll(list);
    return member;
  },
  authenticate: (email: string, password: string) => {
    const m = localMembers.findByEmail(email);
    if (!m || m.password !== password) return null;
    return m;
  },
  list: () => readAll(),
};
