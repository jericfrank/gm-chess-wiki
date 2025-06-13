import { useEffect, useState } from 'react';
import type { Player } from '../types';
import { fetchApi } from '../utils/fetchApi';

export const usePlayerDetails = (username: string | undefined) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    const fetchPlayer = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: apiError } = await fetchApi<Player>(
          `https://api.chess.com/pub/player/${username}`,
        );

        if (apiError || !data) {
          setError(apiError ?? 'Player not found');
          setPlayer(null);
        } else {
          setPlayer(data);
        }
      } catch (err) {
        setError((err as Error).message);
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [username]);

  return { player, loading, error };
};
