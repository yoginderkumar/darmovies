export interface Movie {
  backdrop_path: string;
  id: number;
  original_title?: string;
  overview?: string;
  poster_path: string;
  media_type: string;
  adult?: boolean;
  title: string;
  original_language?: string;
  genre_ids?: Array<number>;
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieProvider {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
  display_priorities?: Array<{ [key: string]: number }>;
}
