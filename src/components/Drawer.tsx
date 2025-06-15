import React from 'react';
import { X, Home, Film, Star, Calendar, Globe, Award } from 'lucide-react';
import { MovieFilters } from '../types/Movie';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const categories = [
    { name: 'All Movies', icon: Home, filter: '' },
    { name: 'Action', icon: Film, filter: 'Action' },
    { name: 'Comedy', icon: Star, filter: 'Comedy' },
    { name: 'Horror', icon: Film, filter: 'Horror' },
    { name: 'Romance', icon: Star, filter: 'Romance' },
    { name: 'Netflix', icon: Award, filter: 'Netflix' },
    { name: 'TV Series', icon: Film, filter: 'TV Series' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:block`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {/* Categories */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Genres
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      onFiltersChange({ ...filters, genre: category.filter });
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      filters.genre === category.filter
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Years */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Release Year
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onFiltersChange({ ...filters, year: '' });
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  !filters.year
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Calendar size={20} />
                <span>All Years</span>
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    onFiltersChange({ ...filters, year: year.toString() });
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    filters.year === year.toString()
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Calendar size={20} />
                  <span>{year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Language
            </h3>
            <div className="space-y-1">
              {['All Languages', 'Hindi', 'English', 'Dual Audio'].map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    onFiltersChange({ 
                      ...filters, 
                      language: language === 'All Languages' ? '' : language.toLowerCase() 
                    });
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    (language === 'All Languages' && !filters.language) ||
                    filters.language === language.toLowerCase()
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Globe size={20} />
                  <span>{language}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;