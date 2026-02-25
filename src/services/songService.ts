import { Song, SongFormData } from "@/types/song";

const API_BASE =
  (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const songService = {
  getAll: (): Promise<Song[]> => request("/songs"),

  getById: (id: number): Promise<Song> => request(`/songs/${id}`),

  create: (data: SongFormData): Promise<Song> =>
    request("/songs", { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: SongFormData): Promise<Song> =>
    request(`/songs/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: number): Promise<{ message: string }> =>
    request(`/songs/${id}`, { method: "DELETE" }),
};
