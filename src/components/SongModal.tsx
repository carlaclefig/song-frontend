import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Song, SongFormData } from "@/types/song";

interface SongModalProps {
  open: boolean;
  song?: Song | null;
  onClose: () => void;
  onSave: (data: SongFormData) => Promise<void>;
}

const EMPTY: SongFormData = {
  title: "",
  artist: "",
  album: "",
  year: new Date().getFullYear(),
  genre: "",
  url: "",
};

export function SongModal({ open, song, onClose, onSave }: SongModalProps) {
  const [form, setForm] = useState<SongFormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        song
          ? {
              title: song.title,
              artist: song.artist,
              album: song.album,
              year: song.year,
              genre: song.genre,
              url: song.url || "",
            }
          : EMPTY,
      );
      setError("");
    }
  }, [open, song]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.artist.trim()) {
      setError("Título y artista son requeridos.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const inputClass =
    "w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted font-body text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-bg-card border border-border rounded-2xl p-6 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-text-primary">
            {song ? "Editar canción" : "Nueva canción"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-bg-hover"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
              Título *
            </label>
            <input
              className={inputClass}
              placeholder="Nombre de la canción"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
              Artista *
            </label>
            <input
              className={inputClass}
              placeholder="Nombre del artista"
              value={form.artist}
              onChange={(e) =>
                setForm((p) => ({ ...p, artist: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
              Álbum
            </label>
            <input
              className={inputClass}
              placeholder="Nombre del álbum"
              value={form.album}
              onChange={(e) =>
                setForm((p) => ({ ...p, album: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
                Año
              </label>
              <input
                type="number"
                className={inputClass}
                placeholder="2024"
                value={form.year}
                onChange={(e) =>
                  setForm((p) => ({ ...p, year: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
                Género
              </label>
              <input
                className={inputClass}
                placeholder="Rock, Pop, Jazz..."
                value={form.genre}
                onChange={(e) =>
                  setForm((p) => ({ ...p, genre: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-body text-text-secondary mb-1.5 uppercase tracking-wider">
              URL de YouTube
              <span className="ml-1.5 text-text-muted normal-case font-normal">
                (opcional)
              </span>
            </label>
            <input
              className={inputClass}
              placeholder="https://www.youtube.com/watch?v=..."
              value={form.url || ""}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
            />
          </div>

          {error && <p className="text-red-400 text-xs font-body">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-text-secondary font-body text-sm hover:bg-bg-hover transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-accent text-bg font-body text-sm font-semibold hover:bg-accent-dim transition-all disabled:opacity-50 shadow-glow-sm"
            >
              {saving ? "Guardando..." : song ? "Guardar cambios" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
