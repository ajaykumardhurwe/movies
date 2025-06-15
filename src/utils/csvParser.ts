import { Movie } from '../types/Movie';

export const parseCSVData = (csvText: string): Movie[] => {
  const lines = csvText.trim().split('\n');
  const movies: Movie[] = [];

  // Skip header row if present
  const dataLines = lines.slice(1);

  dataLines.forEach((line, index) => {
    const columns = parseCSVLine(line);
    if (columns.length >= 4) {
      const [downloadUrl, imageUrl, releaseDate, title] = columns;
      
      // Extract additional info from title
      const movieInfo = extractMovieInfo(title);
      
      movies.push({
        id: `movie-${index}`,
        downloadUrl: downloadUrl.trim(),
        imageUrl: imageUrl.trim(),
        releaseDate: releaseDate.trim(),
        title: movieInfo.title,
        year: movieInfo.year,
        genre: movieInfo.genre,
        rating: generateRandomRating(),
        language: movieInfo.language,
        quality: movieInfo.quality
      });
    }
  });

  return movies;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

const extractMovieInfo = (title: string) => {
  // Extract year
  const yearMatch = title.match(/\((\d{4})\)/);
  const year = yearMatch ? parseInt(yearMatch[1]) : undefined;

  // Extract language info
  const languageMatch = title.match(/\{([^}]+)\}/);
  const language = languageMatch ? languageMatch[1] : 'English';

  // Extract quality info
  const qualityMatches = title.match(/(\d{3,4}p)/g);
  const quality = qualityMatches || ['HD'];

  // Extract genre/type
  let genre = 'Action';
  if (title.toLowerCase().includes('netflix')) genre = 'Netflix';
  else if (title.toLowerCase().includes('season')) genre = 'TV Series';
  else if (title.toLowerCase().includes('horror')) genre = 'Horror';
  else if (title.toLowerCase().includes('comedy')) genre = 'Comedy';
  else if (title.toLowerCase().includes('romance')) genre = 'Romance';

  // Clean title
  const cleanTitle = title
    .replace(/\([^)]*\)/g, '') // Remove year
    .replace(/\{[^}]*\}/g, '') // Remove language info
    .replace(/\d{3,4}p/g, '') // Remove quality info
    .replace(/\|/g, '') // Remove separators
    .replace(/–/g, '-') // Replace em dash
    .replace(/Season \d+/gi, '') // Remove season info
    .replace(/Complete/gi, '') // Remove complete
    .replace(/Dual Audio/gi, '') // Remove dual audio
    .trim();

  return {
    title: cleanTitle,
    year,
    genre,
    language,
    quality
  };
};

const generateRandomRating = (): number => {
  return Math.round((Math.random() * 4 + 6) * 10) / 10; // Rating between 6.0 and 10.0
};