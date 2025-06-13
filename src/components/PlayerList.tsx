import React from 'react';
import { Link } from 'react-router-dom';

import { usePaginatedChessPlayers } from '../hooks/usePaginatedChessPlayers';
import Header from './Header';
import Loading from './Loading';
import LoadMoreButton from './LoadMoreButton';

const PlayerList: React.FC = () => {
  const { players, firstLoading, loading, loadMore, hasMore } = usePaginatedChessPlayers();

  if (firstLoading) {
    return <Loading />;
  }

  return (
    <div className="min-w-180">
      <Header
        title="Grandmasters Wiki"
        description="Discover the legends of chess from around the world."
      />
      <ul role="list" className="divide-y divide-gray-800">
        {players.map((it) => (
          <li key={it.username}>
            <Link
              to={`/${it.username}`}
              className="flex justify-between gap-x-6 py-5 px-4 hover:bg-gray-800 transition"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="size-12 flex-none rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {it.avatar ? (
                    <img className="size-12 object-cover" src={it.avatar} alt={it.username} />
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-white">{it.username}</p>
                  <p className="mt-1 truncate text-xs text-gray-400">{it.league ?? 'No league'}</p>
                </div>
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="flex items-center gap-1 text-sm text-gray-200">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM3 18a7 7 0 0114 0H3z" />
                  </svg>
                  {it.followers}
                </div>
                <p className="mt-1 text-xs text-gray-400">ID: {it.player_id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {players.length > 0 && (
        <div className="mt-6 flex justify-center">
          <LoadMoreButton loading={loading} loadMore={loadMore} hasMore={hasMore} />
        </div>
      )}
    </div>
  );
};

export default PlayerList;
