export type ApiListResponse<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};
