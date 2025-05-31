import { MovieItem } from './MovieItem.ts';
import { Dates } from './Dates.ts';

export interface MovieResult {
  dates: Dates;
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}
