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
      <h1>Pokemon</h1>
      <input type="number" onChange={(e)=>{setNumber(e.target.value)}} />
      <button>Voir</button>
      <h2>{name}</h2>
      <h3>Force : {weight}</h3>
      <img src={data?data.sprites.other.dream_world.front_default : 
        "<p>Loading</p>"}/>
      <p>Mes abilitées :</p>
      {data ? data.abilities.map((value, key)=>{
        return(
          <div key={key}>
            {value.ability.name}
          </div>
        )
      }) : ""}
      <button onClick={addToFavorites}>Ajouter aux favoris</button>
      <Main/>
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
}

export default App;