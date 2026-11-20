import type { MovieItem } from './response/MovieItem.ts';
import type { TvSeriesItem } from './response/TvSeriesItem.ts';

export interface Pagination {
  page: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface SearchParams {
  query: string;
  isMovie: boolean;
}

export type SearchData = MovieItem | TvSeriesItem;

export const isMovieSearchResult = (item: SearchData): item is MovieItem =>
  'title' in item;
