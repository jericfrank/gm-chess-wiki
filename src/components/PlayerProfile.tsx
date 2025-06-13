import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayerDetails } from '../hooks/userPlayerDetails';

import BackButton from './BackButton';
import LastOnline from './LastOnline';
import Loading from './Loading';

const PlayerProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { player, loading, error } = usePlayerDetails(username);

  if (loading) {
    return <Loading />;
  }

  if (error || !player) {
    return <div>Player not found.</div>;
  }

  return (
    <div className="min-w-100">
      <BackButton />
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-200">
        <div className="flex justify-center mb-6">
          {player.avatar ? (
            <img
              className="rounded-full w-40 h-40 object-cover border-4 border-slate-700 shadow-lg"
              src={player.avatar}
              alt={player.username}
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-500 flex items-center justify-center text-6xl">
              👤
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">{player.name ?? player.username}</h2>
        <div className="flex justify-center items-center gap-2 mb-4 text-sky-400 font-semibold">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM3 18a7 7 0 0114 0H3z" />
          </svg>
          {player.followers} followers
        </div>
        <div className="flex justify-between text-gray-300 text-sm mb-2">
          <span>League:</span>
          <span className="font-medium">{player.league ?? 'n/a'}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm mb-2">
          <span>Player ID:</span>
          <span className="font-medium">{player.player_id}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm mb-2">
          <span>Status:</span>
          <span className="font-medium">{player.status}</span>
        </div>
        <div className="flex justify-between text-gray-300 text-sm mb-2">
          <span>Last Online:</span>
          <span className="font-medium">
            <LastOnline lastOne={player.last_online} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
