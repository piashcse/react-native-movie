export interface Celebrity {
  page: number;
  results: CelebrityItem[];
  total_pages: number;
  total_results: number;
}

export interface CelebrityItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: KnownFor[];
}

export interface KnownFor {
  backdrop_path: string | null;
  id: number;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}
