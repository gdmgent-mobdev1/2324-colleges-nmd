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
