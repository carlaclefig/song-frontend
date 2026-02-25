import { X } from "lucide-react";

interface YouTubePlayerProps {
  url: string;
  songTitle: string;
  onClose: () => void;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YouTubePlayer({ url, songTitle, onClose }: YouTubePlayerProps) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return (
      <div className="fixed bottom-4 right-4 z-40 bg-bg-card border border-border rounded-2xl p-4 shadow-2xl w-80 animate-slide-up">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary font-body text-xs">
            No se pudo cargar el video
          </span>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={14} />
          </button>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-body text-sm hover:underline break-all"
        >
          Abrir en YouTube →
        </a>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-40 bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
      style={{ width: "360px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
          <span className="text-text-primary font-body text-xs truncate">
            {songTitle}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-bg-hover flex-shrink-0 ml-2"
        >
          <X size={14} />
        </button>
      </div>

      {/* YouTube embed */}
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={songTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
