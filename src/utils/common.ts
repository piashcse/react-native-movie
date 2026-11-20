import { createSelector } from '@reduxjs/toolkit';
import { movieApi } from '../service/rtk-query/rtkQuery.ts';

type ApiRequestState = { status?: string };
type ApiSliceState = {
  queries: Record<string, ApiRequestState>;
  mutations: Record<string, ApiRequestState>;
};

const selectGlobalLoading = createSelector(
  (state: Record<string, ApiSliceState>) => state[movieApi.reducerPath],
  (apiState: ApiSliceState) => {
    const isFetchingQueries = Object.values(apiState.queries).some(
      (query) => query?.status === 'pending'
    );
    const isFetchingMutations = Object.values(apiState.mutations).some(
      (mutation) => mutation?.status === 'pending'
    );
    return isFetchingQueries || isFetchingMutations;
  }
);
export { selectGlobalLoading };
