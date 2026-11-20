import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MovieDetail } from '../../types/response/MovieDetail.ts';
import { TvSeriesDetail } from '../../types/response/TvSeriesDetail.ts';
import { FavoriteMovie, FavoriteTvSeries } from '../../types/favorite.ts';
import { zustandMMKVStorage } from './mmkv.ts';

interface FavoriteMoviesTvSeriesStore {
  favoriteMovies: FavoriteMovie[];
  toggleFavoriteMovie: (movie: MovieDetail) => void;
  removeFavoriteMovie: (movieId: number) => void;
  isFavoriteMovie: (movieId: number) => boolean;
  clearFavoriteMovies: () => void;
  favoriteTvSeries: FavoriteTvSeries[];
  toggleFavoriteTvSeries: (tvSeries: TvSeriesDetail) => void;
  removeFavoriteTvSeries: (tvSeriesId: number) => void;
  isFavoriteTvSeries: (tvSeriesId: number) => boolean;
  clearFavoriteTvSeries: () => void;
}

const toFavoriteMovie = (movie: MovieDetail): FavoriteMovie => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path ?? null,
});

const toFavoriteTvSeries = (tvSeries: TvSeriesDetail): FavoriteTvSeries => ({
  id: tvSeries.id,
  name: tvSeries.name,
  poster_path: tvSeries.poster_path ?? null,
});

type PersistedFavorites = {
  favoriteMovies?: Array<MovieDetail | FavoriteMovie>;
  favoriteTvSeries?: Array<TvSeriesDetail | FavoriteTvSeries>;
};

export const useFavoriteStore = create<FavoriteMoviesTvSeriesStore>()(
  persist(
    (set, get) => ({
      favoriteMovies: [],
      toggleFavoriteMovie: (movie: MovieDetail) => {
        set((state) => {
          const exists = state.favoriteMovies.some(
            (favorite) => favorite.id === movie.id
          );
          return {
            favoriteMovies: exists
              ? state.favoriteMovies.filter(
                  (favorite) => favorite.id !== movie.id
                )
              : [...state.favoriteMovies, toFavoriteMovie(movie)],
          };
        });
      },
      removeFavoriteMovie: (movieId: number) => {
        set((state) => ({
          favoriteMovies: state.favoriteMovies.filter(
            (movie) => movie.id !== movieId
          ),
        }));
      },
      isFavoriteMovie: (movieId: number) =>
        get().favoriteMovies.some((movie) => movie.id === movieId),
      clearFavoriteMovies: () => set({ favoriteMovies: [] }),
      favoriteTvSeries: [],
      toggleFavoriteTvSeries: (tvSeries: TvSeriesDetail) => {
        set((state) => {
          const exists = state.favoriteTvSeries.some(
            (favorite) => favorite.id === tvSeries.id
          );
          return {
            favoriteTvSeries: exists
              ? state.favoriteTvSeries.filter(
                  (favorite) => favorite.id !== tvSeries.id
                )
              : [...state.favoriteTvSeries, toFavoriteTvSeries(tvSeries)],
          };
        });
      },
      removeFavoriteTvSeries: (tvSeriesId: number) => {
        set((state) => ({
          favoriteTvSeries: state.favoriteTvSeries.filter(
            (series) => series.id !== tvSeriesId
          ),
        }));
      },
      isFavoriteTvSeries: (tvSeriesId: number) =>
        get().favoriteTvSeries.some((series) => series.id === tvSeriesId),
      clearFavoriteTvSeries: () => set({ favoriteTvSeries: [] }),
    }),
    {
      name: '@favorite',
      version: 1,
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({
        favoriteMovies: state.favoriteMovies,
        favoriteTvSeries: state.favoriteTvSeries,
      }),
      migrate: (persistedState) => {
        const persisted = persistedState as PersistedFavorites;
        return {
          favoriteMovies: (persisted.favoriteMovies ?? []).map((movie) =>
            toFavoriteMovie(movie as MovieDetail)
          ),
          favoriteTvSeries: (persisted.favoriteTvSeries ?? []).map((series) =>
            toFavoriteTvSeries(series as TvSeriesDetail)
          ),
        } as FavoriteMoviesTvSeriesStore;
      },
    }
  )
);
