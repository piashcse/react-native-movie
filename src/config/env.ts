import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '@env';

export const env = {
  apiKey: TMDB_API_KEY ?? '',
  baseUrl: TMDB_BASE_URL ?? 'https://api.themoviedb.org/3/',
  imageBaseUrl: TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p',
} as const;
