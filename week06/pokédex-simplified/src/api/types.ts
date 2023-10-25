export type ListItem = {
  name: string;
  url: string;
};

export type ApiListResponse<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type PaginatedResults<T> = ApiListResponse<T> & {
  page: number;
  totalPages: number;
  offset: number;
  limit: number;
};

export type Pagination = {
  limit: number;
  offset: number;
};
