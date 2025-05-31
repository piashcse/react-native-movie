import { createSelector } from '@reduxjs/toolkit';
import { movieApi } from '../redux/query/rtkQuery.ts';

const selectGlobalLoading = createSelector(
  (state: any) => state[movieApi.reducerPath],
  (apiState) => {
    const isFetchingQueries = Object.values(apiState.queries).some(
      (query: any) => query?.status === 'pending'
    );
    const isFetchingMutations = Object.values(apiState.mutations).some(
      (mutation: any) => mutation?.status === 'pending'
    );
    return isFetchingQueries || isFetchingMutations;
  }
);
export { selectGlobalLoading };
