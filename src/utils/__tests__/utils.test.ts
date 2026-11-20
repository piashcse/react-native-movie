import { getImageUrl } from '../image.ts';
import { getErrorMessage } from '../error.ts';

describe('getImageUrl', () => {
  it('returns undefined when no path is provided', () => {
    expect(getImageUrl(null)).toBeUndefined();
    expect(getImageUrl('')).toBeUndefined();
  });

  it('builds a sized image URL', () => {
    expect(getImageUrl('/poster.jpg', 'w185')).toBe(
      'https://image.tmdb.org/t/p/w185/poster.jpg'
    );
  });
});

describe('getErrorMessage', () => {
  it('reads API error payloads', () => {
    expect(getErrorMessage({ data: { status_message: 'Not found' } })).toBe(
      'Not found'
    );
  });

  it('falls back for unknown errors', () => {
    expect(getErrorMessage(undefined)).toBe(
      'Something went wrong. Please try again.'
    );
  });
});
