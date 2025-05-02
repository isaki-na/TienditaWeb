import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonDaycare = ({ pokemons, onRemovePokemon, onMovePokemon }) => {
  return (
    <div className="daycare-container">
      <h2>Guardería ({pokemons.length})</h2>
      <div className="daycare-grid">
        {pokemons.length === 0 ? (
          <p>No hay Pokémon en la guardería. ¡Busca y agrega algunos!</p>
        ) : (
          pokemons.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              index={index}
              onRemove={onRemovePokemon}
              onMove={onMovePokemon}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonDaycare;