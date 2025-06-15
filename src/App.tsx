import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
import { MovieFilters } from './types/Movie';

function App() {
  const { movies, loading, error, filterMovies } = useMovies();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    genre: '',
    year: '',
    language: '',
    quality: '',
    rating: ''
  });

  const filteredMovies = filterMovies(filters);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex">
                {/* Desktop Drawer */}
                <div className="hidden lg:block lg:w-80 flex-shrink-0">
                  <Drawer
                    isOpen={true}
                    onClose={() => {}}
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </div>

                {/* Mobile Drawer */}
                <Drawer
                  isOpen={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  filters={filters}
                  onFiltersChange={setFilters}
                />

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <Header
                    filters={filters}
                    onFiltersChange={setFilters}
                    onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                  />
                  
                  <main className="p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {filters.search ? `Search results for "${filters.search}"` : 
                           filters.genre ? `${filters.genre} Movies` : 
                           'Latest Movies'}
                        </h2>
                        <p className="text-gray-400">
                          {loading ? 'Loading...' : `${filteredMovies.length} movies found`}
                        </p>
                      </div>
                      
                      <MovieGrid
                        movies={filteredMovies}
                        loading={loading}
                        error={error}
                      />
                    </div>
                  </main>
                </div>
              </div>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;