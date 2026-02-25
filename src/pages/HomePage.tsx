import { useState, useMemo } from "react";
import { Search, Plus, RefreshCw, RotateCcw } from "lucide-react";
import { useSongs } from "@/hooks/useSongs";
import { Song, SongFormData } from "@/types/song";
import { SongCard } from "@/components/SongCard";
import { SongModal } from "@/components/SongModal";
import { DeleteModal } from "@/components/DeleteModal";
import { Waveform } from "@/components/Waveform";
import { YouTubePlayer } from "@/components/YouTubePlayer";

export function HomePage() {
  const { songs, loading, error, refetch, createSong, updateSong, deleteSong } =
    useSongs();

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [deleteSongTarget, setDeleteSongTarget] = useState<Song | null>(null);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);

  const genres = useMemo(
    () => [...new Set(songs.map((s) => s.genre).filter(Boolean))].sort(),
    [songs],
  );
  const artists = useMemo(
    () => [...new Set(songs.map((s) => s.artist).filter(Boolean))].sort(),
    [songs],
  );

  const filtered = useMemo(() => {
    return songs.filter((s) => {
      const matchSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.artist.toLowerCase().includes(search.toLowerCase());
      const matchGenre = !genreFilter || s.genre === genreFilter;
      const matchArtist = !artistFilter || s.artist === artistFilter;
      return matchSearch && matchGenre && matchArtist;
    });
  }, [songs, search, genreFilter, artistFilter]);

  const hasFilters = search || genreFilter || artistFilter;

  const resetFilters = () => {
    setSearch("");
    setGenreFilter("");
    setArtistFilter("");
  };

  const handleSave = async (data: SongFormData) => {
    if (editSong) {
      await updateSong(editSong.id, data);
    } else {
      await createSong(data);
    }
  };

  const handlePlay = (song: Song) => {
    setPlayingSong((prev) => (prev?.id === song.id ? null : song));
  };

  const selectClass =
    "bg-bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary font-body text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-bg text-text-primary font-body">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,230,118,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <header className="sticky border-b border-border bg-bg/80 backdrop-blur-md top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18V5l12-2v13"
                  stroke="#00e676"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="6"
                  cy="18"
                  r="3"
                  stroke="#00e676"
                  strokeWidth="1.5"
                />
                <circle
                  cx="18"
                  cy="16"
                  r="3"
                  stroke="#00e676"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-base text-text-primary leading-tight">
                Music Streaming
              </h1>
              <p className="text-text-muted font-body text-xs">
                RESTful API + Catalog
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Waveform bars={5} className="h-5 opacity-60" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Filters */}
        <div className="bg-bg-card border border-border rounded-2xl p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar canciones o artistas..."
              className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary placeholder-text-muted font-body text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">Todos los géneros</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              value={artistFilter}
              onChange={(e) => setArtistFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">Todos los artistas</option>
              {artists.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-text-secondary font-body text-sm hover:bg-bg-hover transition-all whitespace-nowrap"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg text-text-primary">
              Canciones
            </h2>
            {!loading && (
              <span className="text-text-muted font-body text-sm">
                {filtered.length}
                {filtered.length !== songs.length && `/${songs.length}`}
              </span>
            )}
            <button
              onClick={refetch}
              className="text-text-muted hover:text-accent transition-colors p-1 rounded-lg hover:bg-accent/10"
              title="Recargar"
            >
              <RefreshCw size={13} />
            </button>
          </div>
          <button
            onClick={() => {
              setEditSong(null);
              setAddOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-bg font-body text-sm font-semibold hover:bg-accent-dim transition-all shadow-glow-sm"
          >
            <Plus size={15} />
            Add Song
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Waveform bars={7} className="h-10" />
            <p className="text-text-muted font-body text-sm">
              Cargando canciones...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#f87171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-red-400 font-body text-sm font-medium">
                Error de conexión
              </p>
              <p className="text-text-muted font-body text-xs mt-1">{error}</p>
            </div>
            <button
              onClick={refetch}
              className="px-4 py-2 rounded-xl border border-border text-text-secondary font-body text-sm hover:bg-bg-hover transition-all"
            >
              Reintentar
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <Waveform bars={5} animate={false} className="h-8 opacity-20" />
            <p className="text-text-secondary font-body text-sm">
              {hasFilters
                ? "No hay canciones que coincidan con los filtros"
                : "No hay canciones aún"}
            </p>
            {!hasFilters && (
              <button
                onClick={() => setAddOpen(true)}
                className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent font-body text-sm hover:bg-accent/20 transition-all"
              >
                Agregar primera canción
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="hidden sm:grid grid-cols-[2rem_1fr_1fr_auto_5rem] gap-4 px-4 py-2 text-text-muted font-body text-xs uppercase tracking-wider">
              <span>#</span>
              <span>Título / Artista</span>
              <span>Álbum</span>
              <span>Género / Año</span>
              <span />
            </div>
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border/50">
              {filtered.map((song, i) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={i}
                  isPlaying={playingSong?.id === song.id}
                  onPlay={handlePlay}
                  onEdit={(s) => {
                    setEditSong(s);
                    setAddOpen(true);
                  }}
                  onDelete={(s) => setDeleteSongTarget(s)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <SongModal
        open={addOpen}
        song={editSong}
        onClose={() => {
          setAddOpen(false);
          setEditSong(null);
        }}
        onSave={handleSave}
      />
      <DeleteModal
        open={!!deleteSongTarget}
        song={deleteSongTarget}
        onClose={() => setDeleteSongTarget(null)}
        onConfirm={() => deleteSong(deleteSongTarget!.id)}
      />
      {playingSong && playingSong.url && (
        <YouTubePlayer
          url={playingSong.url}
          songTitle={`${playingSong.title} — ${playingSong.artist}`}
          onClose={() => setPlayingSong(null)}
        />
      )}
    </div>
  );
}
