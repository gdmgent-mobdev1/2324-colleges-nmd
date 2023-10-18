import { ApiListResponse, ListItem } from "../../api/types";
import { Pokemon } from "./types";

export const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  if (response.ok) {
    const result: ApiListResponse<ListItem> = await response.json();
    return result;
  }
  throw new Error(`Failed to fetch pokemon with status ${response.status}`);
};

export const fetchPokemonById = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (response.ok) {
    const result: Pokemon = await response.json();
    return result;
  }
  throw new Error(`Failed to fetch pokemon with status ${response.status}`);
};
