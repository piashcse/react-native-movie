import { ImageSize } from '../constant/appConstants.ts';
import { env } from '../config/env.ts';

/**
 * Builds a TMDB image URL for the requested size.
 * Returns `undefined` when the API does not provide an image path.
 */
export const getImageUrl = (
  path?: string | null,
  size: ImageSize = 'w342'
): string | undefined => {
  if (!path) {
    return undefined;
  }

  return `${env.imageBaseUrl}/${size}${path}`;
};
