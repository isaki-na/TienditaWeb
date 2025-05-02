import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch = ({ onAddPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchPokemon = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      setSearchResults([response.data]);
    } catch (error) {
      setSearchResults([]);
      alert('Pokémon no encontrado');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAdd = (pokemon) => {
    onAddPokemon({
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
    });
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <h2>Buscar Pokémon</h2>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nombre o número"
        />
        <button onClick={searchPokemon} disabled={isSearching}>
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-result">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
              />
              <h3>{pokemon.name}</h3>
              <button onClick={() => handleAdd(pokemon)}>
                Agregar a guardería
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;