import { FC, useEffect, useState } from "react";
import { usePokemonFetcher } from "@app/hooks/usePokemonFetcher";
import { InfiniteList } from "@app/components/InfiniteList";
import { PokemonCard } from "@app/components/PokemonCard";
import { Pokemon, PokemonName } from "@app/types/Common.type";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { PokemonCardDetail } from "@app/components/PokemonCardDetail";

type Props = {};

export const Home: FC<Props> = () => {
  const { onFetchPokemonName, onLoadMorePokemon, pokemonData, hasLoadMore } =
    usePokemonFetcher();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    onFetchPokemonName();
  }, []);

  const renderItem = (pokemonItem: PokemonName) => {
    return (
      <AnimatePresence>
        <motion.div
          layoutId={pokemonItem.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PokemonCard
            onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)}
            key={pokemonItem.name}
            pokemonItem={pokemonItem}
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="container mx-auto py-4 px-2 md:px-0">
      <AnimateSharedLayout>
        <InfiniteList
          className="xl:masonry-4-col md:masonry-2-col masonry-col"
          loadMore={onLoadMorePokemon}
          hasMore={hasLoadMore}
        >
          {pokemonData.map(renderItem)}
        </InfiniteList>

        <AnimatePresence>
          {selectedPokemon && (
            <PokemonCardDetail
              onClose={() => setSelectedPokemon(undefined)}
              selectedPokemon={selectedPokemon}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};
