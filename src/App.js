import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './Components/style.css';
import Main from './Components/Main';
import Favorites from './Components/Favorites'; // Importation du composant Favorites

function App() {
  
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [weight, setWeight] = useState();
  const [number, setNumber] = useState(1);
  const [favorites, setFavorites] = useState([]); // État pour stocker les favoris

  // URL de l'API Pokémon
  const URL = `https://pokeapi.co/api/v2/pokemon/${number}`;

  useEffect(()=>{
    axios.get(URL).then((response)=> {
      console.log(response.data)
      setData(response.data)
      setName(response.data.name)
      setWeight(response.data.weight)
      setNumber(response.data.id)
    }).catch((err)=>{
      window.alert(err);
    }) 
  },[number])

  // Fonction pour ajouter un Pokémon aux favoris
  const addToFavorites = () => {
    if (!favorites.includes(data)) {
      setFavorites([...favorites, data]);
    }
  };

  // Fonction pour supprimer un Pokémon des favoris
  const removeFromFavorites = (pokemon) => {
    setFavorites(favorites.filter((fav) => fav !== pokemon));
  };

  return (
    <div className="App">
      <header>
        <h1>Pokédex</h1>
        <p>Explorez les Pokémon</p>
      </header>
      <main>
        <section className="search-bar">
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
          <button className="search-btn">Voir</button>
        </section>
        {data && (
          <section className="pokemon-info">
            <h2>{name}</h2>
            <h3>Force : {weight}</h3>
            <img src={data.sprites.other.dream_world.front_default} alt={name} />
            <div className="abilities">
              <h4>Mes abilitées :</h4>
              <ul>
                {data.abilities.map((ability, index) => (
                  <li key={index}>
                    <span className="ability-name">{ability.ability.name}</span>
                    <p className="ability-description">{ability.ability.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button className="favorite-btn" onClick={addToFavorites}>
              Ajouter aux favoris
            </button>
          </section>
        )}
        <Main />
        <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
      </main>
    </div>
  );
}

export default App;