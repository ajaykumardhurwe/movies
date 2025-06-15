export interface Movie {
  id: string;
  downloadUrl: string;
  imageUrl: string;
  releaseDate: string;
  title: string;
  year?: number;
  genre?: string;
  rating?: number;
  language?: string;
  quality?: string[];
}

export interface MovieFilters {
  search: string;
  genre: string;
  year: string;
  language: string;
  quality: string;
  rating: string;
}