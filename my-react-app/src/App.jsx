import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PokemonDaycare from './components/PokemonDaycare';
import PokemonSearch from './components/PokemonSearch';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);

  const addPokemon = (pokemon) => {
    if (!pokemons.some(p => p.id === pokemon.id)) {
      setPokemons([...pokemons, pokemon]);
    } else {
      alert('¡Este Pokémon ya está en la guardería!');
    }
  };

  const removePokemon = (id) => {
    setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
  };

  const movePokemon = (dragIndex, hoverIndex) => {
    const draggedPokemon = pokemons[dragIndex];
    const updatedPokemons = [...pokemons];
    updatedPokemons.splice(dragIndex, 1);
    updatedPokemons.splice(hoverIndex, 0, draggedPokemon);
    setPokemons(updatedPokemons);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Guardería Pokémon</h1>
        <div className="container">
          <PokemonSearch onAddPokemon={addPokemon} />
          <PokemonDaycare 
            pokemons={pokemons} 
            onRemovePokemon={removePokemon} 
            onMovePokemon={movePokemon} 
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;