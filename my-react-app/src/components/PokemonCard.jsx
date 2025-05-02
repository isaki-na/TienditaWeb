import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const PokemonCard = ({ pokemon, index, onRemove, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'POKEMON',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'POKEMON',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`pokemon-card ${isDragging ? 'dragging' : ''}`}
    >
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="pokemon-image"
      />
      <h3>{pokemon.name}</h3>
      <button onClick={() => onRemove(pokemon.id)} className="remove-btn">
        Liberar
      </button>
    </div>
  );
};

export default PokemonCard;