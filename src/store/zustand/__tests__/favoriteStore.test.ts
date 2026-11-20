import { useFavoriteStore } from '../favoriteStore.ts';
import { MovieDetail } from '../../../types/response/MovieDetail.ts';

const movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/poster.jpg',
  overview: 'A very long overview that should not be persisted',
  genres: [],
} as unknown as MovieDetail;

describe('favoriteStore', () => {
  beforeEach(() => {
    useFavoriteStore.setState({
      favoriteMovies: [],
      favoriteTvSeries: [],
    });
  });

  it('stores only the minimal movie fields', () => {
    useFavoriteStore.getState().toggleFavoriteMovie(movie);

    expect(useFavoriteStore.getState().favoriteMovies).toEqual([
      { id: 1, title: 'Test Movie', poster_path: '/poster.jpg' },
    ]);
    expect(useFavoriteStore.getState().isFavoriteMovie(1)).toBe(true);
  });

  it('toggles the same movie off', () => {
    useFavoriteStore.getState().toggleFavoriteMovie(movie);
    useFavoriteStore.getState().toggleFavoriteMovie(movie);

    expect(useFavoriteStore.getState().favoriteMovies).toEqual([]);
    expect(useFavoriteStore.getState().isFavoriteMovie(1)).toBe(false);
  });

  it('removes a favorite by id', () => {
    useFavoriteStore.getState().toggleFavoriteMovie(movie);
    useFavoriteStore.getState().removeFavoriteMovie(1);

    expect(useFavoriteStore.getState().favoriteMovies).toEqual([]);
  });
});
