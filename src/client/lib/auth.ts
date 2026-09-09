// import { api } from "./api"; // removed as there is no backend

export interface User {
  id: string; // Changed to string to support randomUUID
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
}

const SESSION_KEY = "mymoneyfriend_session";
const SESSION_EXPIRY_KEY = "mymoneyfriend_session_expiry";
const SESSION_DAYS = 7;

// ─── Salva a sessão com validade de 7 dias ────────────────────────────────────
export function saveSession(user: User, token?: string) {
  const expiry = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_EXPIRY_KEY, String(expiry));
  if (token) {
    localStorage.setItem("mymoneyfriend_token", token);
  }
  window.dispatchEvent(new Event("user_profile_updated"));
}

// ─── Atualiza os dados do usuário na sessão ativa ────────────────────────────
export function updateSessionUser(updates: Partial<User>): User | null {
  const current = getSession();
  if (!current) return null;
  const updated: User = { ...current, ...updates };
  saveSession(updated);
  return updated;
}

// ─── Retorna a sessão válida ou null ──────────────────────────────────────────
export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (!raw || !expiry) return null;

    // Se a sessão expirou, limpa tudo e força novo login
    if (Date.now() > Number(expiry)) {
      logout();
      return null;
    }

    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem("mymoneyfriend_token");
}

// ─── Registra novo usuário via LocalStorage ────────────────────────────────────────────
export async function register(name: string, email: string, password: string): Promise<User> {
  const users = JSON.parse(localStorage.getItem("mymoneyfriend_users") || "[]");
  if (users.find((u: any) => u.email === email)) {
    throw new Error("E-mail já cadastrado");
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // Em um app real, nunca salve senha em plain text!
  };
  
  users.push(user);
  localStorage.setItem("mymoneyfriend_users", JSON.stringify(users));

  const { password: _, ...userWithoutPassword } = user;
  const token = "mock-jwt-token-" + user.id;

  saveSession(userWithoutPassword as User, token); // sessão de 7 dias a partir do cadastro
  return userWithoutPassword as User;
}

// ─── Login via LocalStorage + renova sessão por mais 7 dias ────────────────────────────
export async function login(email: string, password: string): Promise<User> {
  const users = JSON.parse(localStorage.getItem("mymoneyfriend_users") || "[]");
  const user = users.find((u: any) => u.email === email.trim() && u.password === password);

  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = "mock-jwt-token-" + user.id;

  // Renova a sessão por mais 7 dias a cada login bem-sucedido
  saveSession(userWithoutPassword as User, token);
  return userWithoutPassword as User;
}

// ─── Logout: remove apenas a sessão ──────────────────────────────────────────
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_EXPIRY_KEY);
  localStorage.removeItem("mymoneyfriend_token");
}

// ─── Verifica se a sessão está próxima do vencimento e renova ─────────────────
// Chame isso no App.tsx para renovar automaticamente sessões ativas
export function refreshSessionIfNeeded(): void {
  const raw = localStorage.getItem(SESSION_KEY);
  const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
  if (!raw || !expiry) return;

  const remaining = Number(expiry) - Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Se falta menos de 1 dia, renova por mais 7 dias automaticamente
  if (remaining > 0 && remaining < oneDayMs) {
    const user = JSON.parse(raw) as User;
    saveSession(user);
  }
}
