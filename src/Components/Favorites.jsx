import React from 'react';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Mes Pokémon favoris</h2>
      <ul>
        {favorites.map((pokemon, index) => (
          <li key={index}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.other.dream_world.front_default} />
            <button onClick={() => removeFromFavorites(pokemon)}>Supprimer des favoris</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;