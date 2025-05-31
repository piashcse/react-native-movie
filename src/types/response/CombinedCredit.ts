import { Cast, Crew } from './ArtistAndCrew.ts';

export interface CombinedCredit {
  cast: Cast[];
  crew: Crew[];
  id: number;
}
