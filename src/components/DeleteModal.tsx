import { Trash2 } from 'lucide-react';
import { Song } from '@/types/song';

interface DeleteModalProps {
  open: boolean;
  song?: Song | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteModal({ open, song, onClose, onConfirm }: DeleteModalProps) {
  if (!open || !song) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-bg-card border border-border rounded-2xl p-6 shadow-2xl animate-slide-up text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h2 className="font-display text-base text-text-primary mb-2">¿Eliminar canción?</h2>
        <p className="text-text-secondary font-body text-sm mb-6">
          <span className="text-text-primary font-semibold">"{song.title}"</span> de {song.artist} será eliminada permanentemente.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-text-secondary font-body text-sm hover:bg-bg-hover transition-all">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500/90 text-white font-body text-sm font-semibold hover:bg-red-500 transition-all">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
