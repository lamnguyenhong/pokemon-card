import { useState } from "react";
import { axiosApiInstance } from "@app/utils/api";
import { Pokemon, PokemonName } from "@app/types/Common.type";

export const usePokemonFetcher = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasLoadMore, setHasLoadMore] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<PokemonName[]>([]);
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | undefined>();

  const onFetchPokemonName = async (initData: PokemonName[] = []) => {
    let responseData: PokemonName[] = [];
    try {
      const { data } = await axiosApiInstance.get("/pokemon", {
        params: {
          limit: 20,
          offset: initData.length,
        },
      });
      const { results, count } = data;
      responseData = [...initData, ...results];
      setPokemonData(responseData);
      setHasLoadMore(responseData.length < count);
    } catch (e) {
    } finally {
      setLoading(false);
    }

    return responseData;
  };

  const onLoadMorePokemon = async () => {
    await onFetchPokemonName(pokemonData);
  };

  const fetchPokemonDetail: (
    pokemonDetailUrl: string
  ) => Promise<void> = async (pokemonDetailUrl: string) => {
    try {
      const { data: pokemonData } = await axiosApiInstance.get<Pokemon>(
        pokemonDetailUrl
      );
      setPokemonDetail(pokemonData);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    pokemonData,
    pokemonDetail,
    hasLoadMore,
    onLoadMorePokemon,
    onFetchPokemonName,
    fetchPokemonDetail,
  };
};
