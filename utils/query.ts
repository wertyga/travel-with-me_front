import { SORT_BY, SORT_DIRECTION, SortRequest } from '@/types';

export const getPaginationParams = (
  query: Record<string, string>,
  limit: number = 12
) => {
  const page = query.page ? Math.max(0, Number(query.page) - 1) : 0;
  return {
    offset: page * limit,
    limit,
  };
};

export const getSortParams = (query: Record<string, string>) => {
  const result = {} as SortRequest;
  if (query.sortBy) {
    result.sortBy = query.sortBy as SORT_BY;
  }
  if (query.sortDirection) {
    result.sortDirection = query.sortDirection as SORT_DIRECTION;
  }

  return result;
};

export const getSortAndPaginationParams = (
  query: Record<string, string>,
  limit?: number
) => {
  return {
    ...getPaginationParams(query, limit),
    ...getSortParams(query),
  };
};
