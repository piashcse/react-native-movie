import { TvSeriesItem } from './TvSeriesItem.ts';

export interface TvSeriesResult {
  page: number;
  results: TvSeriesItem[];
  total_pages: number;
  total_results: number;
}
