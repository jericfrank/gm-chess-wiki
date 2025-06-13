import { useEffect, useState } from 'react';
import type { Player } from '../types';
import { batchFetch } from '../utils/batchFetchData';
import { fetchApi } from '../utils/fetchApi';

const STORAGE_KEYS = {
  USERNAMES: 'chess_gm_usernames',
  PLAYERS: 'chess_gm_players',
  CURRENT_PAGE: 'chess_gm_current_page',
};

export const usePaginatedChessPlayers = (batchSize = 10) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (usernames.length) return;

    const fetchUsernames = async () => {
      setFirstLoading(true);
      const { data, error: fetchError } = await fetchApi<{ players: string[] }>(
        'https://api.chess.com/pub/titled/GM',
      );
      if (fetchError || !data?.players) {
        setError(fetchError ?? 'Failed to fetch usernames');
        setLoading(false);
        return;
      }
      setUsernames(data.players);
      localStorage.setItem(STORAGE_KEYS.USERNAMES, JSON.stringify(data.players));
    };

    fetchUsernames();
  }, [usernames]);

  useEffect(() => {
    if (usernames.length > 0 && players.length === 0) {
      loadMore();
    }
  }, [usernames]);

  const loadMore = async () => {
    if (loading || !usernames.length || !hasMore) return;

    setLoading(true);
    const start = currentPage * batchSize;
    const end = start + batchSize;
    const batch = usernames.slice(start, end);

    try {
      const fetchedPlayers = await batchFetch<Player>(
        batch,
        (username: string) => `https://api.chess.com/pub/player/${username}`,
      );

      const newPlayers = [...players, ...fetchedPlayers];
      setPlayers(newPlayers);
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(newPlayers));

      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, nextPage.toString());

      if (end >= usernames.length) {
        setHasMore(false);
      }
      setFirstLoading(false);
    } catch (err) {
      setError('Failed to fetch player details');
    } finally {
      setLoading(false);
    }
  };

  return { players, firstLoading, loading, error, loadMore, hasMore };
};
