import { ApiListResponse } from "../../types";
import { Pokemon } from "./types";

export const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  if (response.ok) {
    const result: ApiListResponse<Pokemon> = await response.json();
    return result;
  }
  // todo error handling
};
