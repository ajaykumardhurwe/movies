import React, { useState } from 'react';
import { Menu, X, Search, Filter, Film } from 'lucide-react';
import { MovieFilters } from '../types/Movie';

interface HeaderProps {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
  onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ filters, onFiltersChange, onDrawerToggle }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onDrawerToggle}
              className="text-gray-300 hover:text-white p-2 rounded-md lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Film className="text-purple-500" size={32} />
              <h1 className="text-xl font-bold text-white hidden sm:block">
                Movies<span className="text-purple-500">Hub</span>
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search movies..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-gray-300 hover:text-white p-2 rounded-md flex items-center space-x-2"
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="py-4 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <select
                value={filters.genre}
                onChange={(e) => onFiltersChange({ ...filters, genre: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Genres</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Netflix">Netflix</option>
                <option value="TV Series">TV Series</option>
              </select>

              <select
                value={filters.language}
                onChange={(e) => onFiltersChange({ ...filters, language: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Languages</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="dual">Dual Audio</option>
              </select>

              <select
                value={filters.quality}
                onChange={(e) => onFiltersChange({ ...filters, quality: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Quality</option>
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="4K">4K</option>
              </select>

              <select
                value={filters.year}
                onChange={(e) => onFiltersChange({ ...filters, year: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => 2025 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={filters.rating}
                onChange={(e) => onFiltersChange({ ...filters, rating: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Ratings</option>
                <option value="8">8.0+ Rating</option>
                <option value="7">7.0+ Rating</option>
                <option value="6">6.0+ Rating</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;