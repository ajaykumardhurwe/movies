import { useState, useEffect } from 'react';
import { Movie, MovieFilters } from '../types/Movie';
import { parseCSVData } from '../utils/csvParser';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfe6NepmnK7atMVxePEBaptPY65Bfqn-8-hrJndACX_SXxqYUrGTcA_-fdr02KJJ41fTGGbeugqAK0/pub?gid=133005200&single=true&output=csv';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        
        const csvText = await response.text();
        const parsedMovies = parseCSVData(csvText);
        setMovies(parsedMovies);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filterMovies = (filters: MovieFilters): Movie[] => {
    return movies.filter(movie => {
      const matchesSearch = filters.search === '' || 
        movie.title.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesGenre = filters.genre === '' || 
        movie.genre?.toLowerCase() === filters.genre.toLowerCase();
      
      const matchesYear = filters.year === '' || 
        movie.year?.toString() === filters.year;
      
      const matchesLanguage = filters.language === '' || 
        movie.language?.toLowerCase().includes(filters.language.toLowerCase());
      
      const matchesQuality = filters.quality === '' || 
        movie.quality?.some(q => q.toLowerCase().includes(filters.quality.toLowerCase()));
      
      const matchesRating = filters.rating === '' || 
        (movie.rating && movie.rating >= parseFloat(filters.rating));

      return matchesSearch && matchesGenre && matchesYear && 
             matchesLanguage && matchesQuality && matchesRating;
    });
  };

  return { movies, loading, error, filterMovies };
};