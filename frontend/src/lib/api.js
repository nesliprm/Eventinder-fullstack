export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const getToken = () => localStorage.getItem("token") || "";
export const setToken = (t) => localStorage.setItem("token", t);
export const clearToken = () => localStorage.removeItem("token");

export async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const method = (options.method || "GET").toUpperCase();

  const headers = new Headers(options.headers || {});
  const token = getToken();

  if (method !== "GET" && token && !headers.has("Authorization")) {
    headers.set("Authorization", token);
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status} ${res.statusText}: ${msg}`);
  }
  return res;
}
