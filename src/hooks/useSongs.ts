import { useState, useEffect, useCallback } from 'react';
import { Song, SongFormData } from '@/types/song';
import { songService } from '@/services/songService';

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await songService.getAll();
      setSongs(data);
    } catch (e: any) {
      setError(e.message || 'Error al cargar canciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSongs(); }, [fetchSongs]);

  const createSong = async (data: SongFormData) => {
    const newSong = await songService.create(data);
    setSongs(prev => [newSong, ...prev]);
    return newSong;
  };

  const updateSong = async (id: number, data: SongFormData) => {
    const updated = await songService.update(id, data);
    setSongs(prev => prev.map(s => s.id === id ? updated : s));
    return updated;
  };

  const deleteSong = async (id: number) => {
    await songService.delete(id);
    setSongs(prev => prev.filter(s => s.id !== id));
  };

  return { songs, loading, error, refetch: fetchSongs, createSong, updateSong, deleteSong };
}
