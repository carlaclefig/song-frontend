import { Pencil, Trash2, Music2, PlayCircle } from "lucide-react";
import { Song } from "@/types/song";

interface SongCardProps {
  song: Song;
  index: number;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
}

export function SongCard({
  song,
  index,
  isPlaying,
  onPlay,
  onEdit,
  onDelete,
}: SongCardProps) {
  return (
    <div
      className={`group flex items-center gap-4 px-4 py-3 transition-all duration-200 animate-fade-in ${isPlaying ? "bg-accent/5 border-l-2 border-l-accent" : "hover:bg-bg-hover"}`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="w-8 flex-shrink-0 text-center">
        {isPlaying ? (
          <div className="flex items-end justify-center gap-[2px] h-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-accent animate-bar"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        ) : (
          <>
            <span className="text-text-muted font-display text-xs group-hover:hidden">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Music2
              size={14}
              className="text-accent hidden group-hover:block mx-auto"
            />
          </>
        )}
      </div>

      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-1 sm:gap-4 items-center">
        <div className="min-w-0">
          <p
            className={`font-body font-medium text-sm truncate ${isPlaying ? "text-accent" : "text-text-primary"}`}
          >
            {song.title}
          </p>
          <p className="text-text-secondary font-body text-xs truncate">
            {song.artist}
          </p>
        </div>
        <div className="hidden sm:block min-w-0">
          <p className="text-text-secondary font-body text-sm truncate">
            {song.album || "—"}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-body text-xs whitespace-nowrap">
            {song.genre || "Sin género"}
          </span>
          <span className="text-text-muted font-display text-xs">
            {song.year}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {song.url && (
          <button
            onClick={() => onPlay(song)}
            className={`p-2 rounded-lg transition-all ${isPlaying ? "text-accent" : "text-text-muted hover:text-accent hover:bg-accent/10 opacity-0 group-hover:opacity-100"}`}
            title="Reproducir en YouTube"
          >
            <PlayCircle size={16} />
          </button>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(song)}
            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-accent/10 transition-all"
            title="Editar"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(song)}
            className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-all"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
