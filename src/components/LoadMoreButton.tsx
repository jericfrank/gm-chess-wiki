import React from 'react';

interface Props {
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ hasMore, loading, loadMore }) => {
  if (hasMore && !loading) {
    return (
      <button
        onClick={loadMore}
        className="
          mt-8 px-8 py-3 
          text-lg font-semibold text-white 
          rounded-full shadow-lg 
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
          transition-all duration-300 
          hover:brightness-110 hover:scale-105
        "
      >
        Load More
      </button>
    );
  }

  return <div className="mt-8 text-gray-400 text-sm">Loading...</div>;
};

export default LoadMoreButton;
