// export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

// export async function apiFetch(path, options) {
//   const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
//   const res = await fetch(url, options);
//   if (!res.ok) {
//     const msg = await res.text().catch(() => res.statusText);
//     throw new Error(`API ${res.status} ${res.statusText}: ${msg}`);
//   }
//   return res;
// }

// export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

// export const getToken = () => localStorage.getItem("token") || "";
// export const setToken = (t) => localStorage.setItem("token", t);
// export const clearToken = () => localStorage.removeItem("token");

// export async function apiFetch(path, options) {
//   const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
//   const headers = new Headers(options.headers || {});
//   const token = getToken();
//   if (token && !headers.has("Authorization")) {
//     headers.set("Authorization", token);
//   }
//   const response = await fetch(url, { ...options, headers });
//   if (!response.ok) {
//     const msg = await response.text().catch(() => response.statusText);
//     throw new Error(`API ${response.status} ${response.statusText}: ${msg}`);
//   }
//   return response;
// }

export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const getToken = () => localStorage.getItem("token") || "";
export const setToken = (t) => localStorage.setItem("token", t);
export const clearToken = () => localStorage.removeItem("token");

export async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const method = (options.method || "GET").toUpperCase();

  const headers = new Headers(options.headers || {});
  const token = getToken();

  // Only attach token for non-GET (POST/PUT/PATCH/DELETE)
  if (method !== "GET" && token && !headers.has("Authorization")) {
    headers.set("Authorization", token); // we'll try both plain and "Bearer ..."
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status} ${res.statusText}: ${msg}`);
  }
  return res;
}
