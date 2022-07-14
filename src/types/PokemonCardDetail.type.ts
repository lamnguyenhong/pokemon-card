import { Pokemon } from "@app/types/Common.type";

export type PokemonCardDetailProps = {
  selectedPokemon: Pokemon;
  onClose: () => void;
};
