export interface Movie {
  id: number;
  vote_average: number;
  title: string;
  popularity: number;
  backdrop_path: string;
  overview: string;
}

export interface MovieDetails {
  id: number;
  vote_average: number;
  title: string;
  popularity: number;
  overview: string;
  top_billed_cast: any[];
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  release_date: string;
  vote_count: number;
  imdb_id: string;
  crew: any[];
  budget: number;
  genres: any[];
  revenue: number;
  original_language: string;
  trailer: any;
}

export interface MovieInCategory {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}
