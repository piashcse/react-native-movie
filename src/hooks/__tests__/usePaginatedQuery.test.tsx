import { act, renderHook, waitFor } from '@testing-library/react-native';
import { usePaginatedQuery } from '../usePaginatedQuery.ts';
import { PaginatedResult } from '../../types/api.ts';

type Item = { id: number };

const getId = (item: Item) => item.id;

const createResponse = (page: number): PaginatedResult<Item> => ({
  items: [{ id: page }],
  page,
  totalPages: 2,
  totalResults: 2,
});

describe('usePaginatedQuery', () => {
  it('loads the first page and appends the next page', async () => {
    const fetchPage = jest.fn((page: number) =>
      Promise.resolve(createResponse(page))
    );

    const { result } = await renderHook(() =>
      usePaginatedQuery({ fetchPage, getId })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.items).toEqual([{ id: 1 }]);

    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.items).toHaveLength(2));
    expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.current.hasMore).toBe(false);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it('deduplicates items returned by the API', async () => {
    const fetchPage = jest
      .fn()
      .mockResolvedValueOnce({
        items: [{ id: 1 }],
        page: 1,
        totalPages: 2,
        totalResults: 2,
      })
      .mockResolvedValueOnce({
        items: [{ id: 1 }, { id: 2 }],
        page: 2,
        totalPages: 2,
        totalResults: 2,
      });

    const { result } = await renderHook(() =>
      usePaginatedQuery({ fetchPage, getId })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.items).toHaveLength(2));
    expect(result.current.items.map(getId)).toEqual([1, 2]);
  });

  it('exposes an error and stops pagination when the first page fails', async () => {
    const fetchPage = jest.fn().mockRejectedValue(new Error('Network down'));

    const { result } = await renderHook(() =>
      usePaginatedQuery({ fetchPage, getId })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe('Network down');
    expect(result.current.hasMore).toBe(false);
    expect(result.current.items).toEqual([]);
  });
});
