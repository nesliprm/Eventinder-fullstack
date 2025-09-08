export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export async function apiFetch(path, options) {
  const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status} ${res.statusText}: ${msg}`);
  }
  return res;
}
