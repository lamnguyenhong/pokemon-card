import { Pokemon, PokemonName } from "@app/types/Common.type";

export type PokemonCardProps = {
  pokemonItem: PokemonName;
  onSelectPokemon: (pokemon?: Pokemon) => void;
};
