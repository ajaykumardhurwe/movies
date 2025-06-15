import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Globe, Download, Play, Share2 } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, loading } = useMovies();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Movies</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>

        {/* Share Button */}
        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
          <Share2 size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl sticky top-4">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star size={20} fill="currentColor" />
                  <span className="font-semibold">{movie.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-300">
                  <Calendar size={20} />
                  <span>{movie.year}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-300">
                  <Globe size={20} />
                  <span>{movie.language}</span>
                </div>
                
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.genre}
                </span>
              </div>

              {/* Quality Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Available Quality</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.quality?.map((quality, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold border border-gray-600"
                    >
                      {quality}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={movie.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <Download size={20} />
                  <span>Download Movie</span>
                </a>
                
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <Play size={20} />
                  <span>Watch Trailer</span>
                </button>
              </div>

              {/* Movie Details */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Movie Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Release Date:</span>
                    <span className="text-white ml-2">{movie.releaseDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genre:</span>
                    <span className="text-white ml-2">{movie.genre}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white ml-2">{movie.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Quality:</span>
                    <span className="text-white ml-2">{movie.quality?.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;