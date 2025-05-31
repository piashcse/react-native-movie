import { create } from 'zustand';
import { MovieDetail } from '../types/response/MovieDetail.ts';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TvSeriesDetail } from '../types/response/TvSeriesDetail.ts';
import { zustandMMKVStorage } from './mmkv.ts';

interface FavoriteMoviesTvSeriesStore {
  favoriteMovies: MovieDetail[];
  toggleFavoriteMovie: (movie: MovieDetail) => void;
  isFavoriteMovie: (movieId: number) => boolean;
  clearFavoriteMovies: () => void;
  favoriteTvSeries: TvSeriesDetail[];
  toggleFavoriteTvSeries: (movie: TvSeriesDetail) => void;
  isFavoriteTvSeries: (tvSeriesId: number) => boolean;
  clearFavoriteTvSeries: () => void;
}

export const useFavoriteStore = create<FavoriteMoviesTvSeriesStore>()(
  persist(
    (set, get) => ({
      favoriteMovies: [],
      toggleFavoriteMovie: (movie: MovieDetail) => {
        set((state: FavoriteMoviesTvSeriesStore) => {
          const isFav = state.favoriteMovies.some(
            (favMovie: MovieDetail) => favMovie.id === movie.id
          );
          return {
            favoriteMovies: isFav
              ? state.favoriteMovies.filter(
                  (favMovie: MovieDetail) => favMovie.id !== movie.id
                ) // Remove from favorites
              : [...state.favoriteMovies, movie], // Add to favorites
          };
        });
      },
      isFavoriteMovie: (movieId: number) =>
        get().favoriteMovies.some((movie: MovieDetail) => movie.id === movieId),

      clearFavoriteMovies: () => set({ favoriteMovies: [] }),
      favoriteTvSeries: [],
      toggleFavoriteTvSeries: (tvSeries: TvSeriesDetail) => {
        set((state: FavoriteMoviesTvSeriesStore) => {
          const isFav = state.favoriteTvSeries.some(
            (favTvSeries: TvSeriesDetail) => favTvSeries.id === tvSeries.id
          );
          return {
            favoriteTvSeries: isFav
              ? state.favoriteTvSeries.filter(
                  (favTvSeries: TvSeriesDetail) =>
                    favTvSeries.id !== tvSeries.id
                ) // Remove from favorites
              : [...state.favoriteTvSeries, tvSeries], // Add to favorites
          };
        });
      },
      isFavoriteTvSeries: (tvSeriesId: number) =>
        get().favoriteTvSeries.some(
          (tvSeries: TvSeriesDetail) => tvSeries.id === tvSeriesId
        ),
      clearFavoriteTvSeries: () => set({ favoriteTvSeries: [] }),
    }),
    {
      name: '@favorite',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
