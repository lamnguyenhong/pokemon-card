import { motion } from "framer-motion";
import { FC, MouseEvent } from "react";
import { PokemonCardDetailProps } from "@app/types/PokemonCardDetail.type";
import { PokemonAbility, PokemonType } from "@app/types/Common.type";

export const PokemonCardDetail: FC<PokemonCardDetailProps> = ({
  selectedPokemon,
  onClose,
}) => {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const renderTypeItem = (pokemonType: PokemonType) => {
    return (
      <button
        key={pokemonType.slot}
        className="mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full"
      >
        <span className="text-white capitalize">{pokemonType.type.name}</span>
      </button>
    );
  };

  const renderAbilityItem = (pokemonAbility: PokemonAbility) => {
    return (
      <tr key={pokemonAbility.slot} className="text-white text-left">
        <td>{pokemonAbility.ability.name}</td>
        <td>{pokemonAbility.slot}</td>
        <td>{pokemonAbility.is_hidden.toString()}</td>
      </tr>
    );
  };

  return (
    <motion.div
      key={selectedPokemon.name}
      onClick={onClose}
      className="fixed inset-0 overlay bg-black bg-opacity-75 flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
    >
      <motion.div
        onClick={onClick}
        layoutId={selectedPokemon.name}
        className="p-10 absolute xl:h-1/2 xl:w-1/2 rounded-lg border border-gray-200 bg-gray-800 z-10"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <img
              className="h-40 w-40 mx-auto"
              src={
                selectedPokemon.sprites.other["official-artwork"].front_default
              }
              alt={selectedPokemon.name}
            />

            <h1 className="text-white text-center">
              #{selectedPokemon.id}{" "}
              <strong className="uppercase">{selectedPokemon.name}</strong>
            </h1>

            <div className="flex items-center mt-4">
              <span className="text-white mr-4">
                <strong>Type:</strong>
              </span>

              {selectedPokemon.types.map(renderTypeItem)}
            </div>

            <div className="flex items-center mt-4">
              <span className="text-white mr-4">
                <strong>Species:</strong>
              </span>

              <span className="text-white capitalize">
                {selectedPokemon.species.name}
              </span>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-white mr-4">
                <strong>Height:</strong>
              </span>

              <span className="text-white">{selectedPokemon.height}</span>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-white mr-4">
                <strong>Weight:</strong>
              </span>

              <span className="text-white">{selectedPokemon.weight}</span>
            </div>
          </div>

          <div className="col-span-2">
            <h2 className="text-xl text-white text-white uppercase font-bold border-b border-b-white py-2">
              Abilities
            </h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-white text-left">
                  <th>Name</th>
                  <th>Slot</th>
                  <th>Hidden</th>
                </tr>
              </thead>
              <tbody>{selectedPokemon.abilities.map(renderAbilityItem)}</tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
