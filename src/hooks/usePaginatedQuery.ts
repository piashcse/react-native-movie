import { useCallback, useEffect, useRef, useState } from 'react';
import { PaginatedResult } from '../types/api.ts';
import { getErrorMessage } from '../utils/error.ts';

interface UsePaginatedQueryOptions<T> {
  fetchPage: (page: number) => Promise<PaginatedResult<T>>;
  getId: (item: T) => number | string;
}

export const usePaginatedQuery = <T>({
  fetchPage,
  getId,
}: UsePaginatedQueryOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const requestId = useRef(0);
  const lastFailedPage = useRef(1);
  const fetchPageRef = useRef(fetchPage);
  const getIdRef = useRef(getId);
  fetchPageRef.current = fetchPage;
  getIdRef.current = getId;

  const load = useCallback(
    async (targetPage: number, mode: 'initial' | 'more' | 'refresh') => {
      if (inFlight.current) {
        return;
      }

      inFlight.current = true;
      const currentRequest = ++requestId.current;

      if (mode === 'initial') {
        setIsLoading(true);
      } else if (mode === 'refresh') {
        setIsRefreshing(true);
      } else {
        setIsFetchingMore(true);
      }

      try {
        const response = await fetchPageRef.current(targetPage);
        if (currentRequest !== requestId.current) {
          return;
        }

        setItems((previous) => {
          if (targetPage === 1) {
            return response.items;
          }

          const getIdForItem = getIdRef.current;
          const seen = new Set(previous.map(getIdForItem));
          return [
            ...previous,
            ...response.items.filter((item) => !seen.has(getIdForItem(item))),
          ];
        });
        setPage(response.page);
        setHasMore(response.page < response.totalPages);
        lastFailedPage.current = 1;
        setError(null);
      } catch (requestError) {
        if (currentRequest === requestId.current) {
          lastFailedPage.current = targetPage;
          setError(getErrorMessage(requestError));
          if (targetPage === 1) {
            setItems([]);
            setHasMore(false);
          }
        }
      } finally {
        if (currentRequest === requestId.current) {
          setIsLoading(false);
          setIsFetchingMore(false);
          setIsRefreshing(false);
        }
        inFlight.current = false;
      }
    },
    []
  );

  useEffect(() => {
    load(1, 'initial');
    return () => {
      requestId.current += 1;
    };
  }, [load]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isFetchingMore || isRefreshing) {
      return;
    }
    load(page + 1, 'more');
  }, [hasMore, isLoading, isFetchingMore, isRefreshing, load, page]);

  const refresh = useCallback(() => {
    load(1, 'refresh');
  }, [load]);

  const retry = useCallback(() => {
    const failedPage = lastFailedPage.current;
    load(failedPage, failedPage === 1 ? 'initial' : 'more');
  }, [load]);

  return {
    items,
    page,
    hasMore,
    isLoading,
    isFetchingMore,
    isRefreshing,
    error,
    loadMore,
    refresh,
    retry,
  };
};
