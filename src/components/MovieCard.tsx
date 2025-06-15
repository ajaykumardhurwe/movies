import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Download } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold flex items-center space-x-1">
            <Star size={12} fill="currentColor" />
            <span>{movie.rating}</span>
          </div>

          {/* Quality Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {movie.quality?.slice(0, 2).map((quality, index) => (
              <span
                key={index}
                className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-semibold"
              >
                {quality}
              </span>
            ))}
          </div>

          {/* Hover Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors">
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{movie.year || 'N/A'}</span>
            </div>
            <span className="bg-gray-700 px-2 py-1 rounded-md">
              {movie.genre}
            </span>
          </div>

          {movie.language && (
            <div className="mt-2">
              <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">
                {movie.language}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;