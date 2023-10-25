import { ApiListResponse, ListItem, PaginatedResults, Pagination } from "../../api/types";
import { Pokemon } from "./types";

export const fetchPokemon = async ({ limit, offset }: Pagination): Promise<PaginatedResults<ListItem>> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/pokemon/?offset=${offset}&limit=${limit}`
  );
  if (response.ok) {
    const result: ApiListResponse<ListItem> = await response.json();
    return {
      ...result,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(result.count / limit),
      offset,
      limit,
    };
  }
  throw new Error(`Failed to fetch pokemon with status ${response.status}`);
};

export const fetchPokemonById = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/pokemon/${id}`);
  if (response.ok) {
    const result: Pokemon = await response.json();
    return result;
  }
  throw new Error(`Failed to fetch pokemon with status ${response.status}`);
};
