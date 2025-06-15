import React from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Film className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <p className="text-red-400 mb-2">Error loading movies</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Film className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">No movies found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;