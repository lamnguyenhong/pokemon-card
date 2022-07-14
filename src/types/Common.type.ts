type PokemonSprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: {
      front_default?: string;
      front_female?: string;
    };
    ["official-artwork"]: {
      front_default: string;
    };
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type PokemonStatItem = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  weight: number;
  stats: PokemonStatItem[];
  types: PokemonType[];
  height: number;
  species: { name: string; url: string };
  abilities: PokemonAbility[];
};

export type PokemonName = {
  name: string;
  url: string;
};
