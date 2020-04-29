import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
import { slugify } from "./helpers";
//import RegionButton from "./components/RegionButton"
//import Caught from "./components/Caught"
import Seen from "./components/Seen"

import { PokemonContext } from "./data/PokemonContext";

import {
  Card,
  CircularProgress,
  Typography
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pokemonName: {
    color: "black",
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
}))

function App() {


  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [pokedex, setPokedex] = useState([]) // Default is empty Array
  const [wildPokemon, setWildPokemon] = useState({})
  const [seen, setSeen] = useState([])
  const [region, setRegion] = useState("Kanto")
  const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"]

  useEffect(() => {
    encounterWildPokemon()
  }, []) 
  // the second item tells us if this changes rerun the function
  // if there is nothing it will update with every state change 
  //and with an empty array it will start 

  const regionSelected = () => {
    console.log(region)
    switch(region){
      case "Kanto": return [1, 151];
      case "Johto": return [152, 251];
      case "Hoenn" : return [252, 386];
      case "Sinnoh": return [387, 493];
      case "Unova": return [494, 649];
      case "Kalos": return [650, 721];
      case "Alola": return [722, 809];
    }
  }
  const pokeId = () => {
    const pokedexNumbers = regionSelected()

    const min = Math.ceil(pokedexNumbers[0])
    const max = Math.floor(pokedexNumbers[1])

    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const encounterWildPokemon = () => {
    setLoading(true)
    setError(false)
      axios
      .get(process.env.REACT_APP_ENDPOINTPOKEMON + pokeId())
      .then(response => {
        //console.log(response.data)
        setLoading(false)
        setError(false)
        console.log(loading)
        setWildPokemon(response.data);
        seenPokemon(response.data)
      })
      .catch(error => console.log(error));
  }

  const seenPokemon = (pokemon) => {
    setSeen( state => {
      const monExists = (state.filter(p => pokemon.id === p.id).length > 0)
      if(!monExists){
        // updtae state with spreading and adding new pokemon
        state = [...state, pokemon]
        // sort in pokedex(id order)
        state.sort(function (a,b){
          return a.id - b.id
        })
      }
      return state
    })

  }
  
  const catchPokemon = (pokemon) => {

      const catchingChance = Math.random();
      console.log(catchingChance)

      if (catchingChance < 0.25) {
        console.log("missed")
      }
      else{ 
        console.log("caught")
        setPokedex(state => {
        // checks in current state if id of current pokemon is there
        const monExists = (state.filter(p => pokemon.id === p.id).length > 0)
        
        // if it doesn't exist
        if(!monExists){
          // updtae state with spreading and adding new pokemon
          state = [...state, pokemon]
          // sort in pokedex(id order)
          state.sort(function (a,b){
            return a.id - b.id
          })
        }
        return state
      })
    }
      encounterWildPokemon()
  }

  const releasePokemon = id => {
    // filter everything that is not the id
    setPokedex(state => state.filter(p => p.id !== id))
  }

  const artChoice = () => {
    //return "https://pokeres.bastionbot.org/images/pokemon/"
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
  }

  return(
    
  <div className="app-wrapper">
    <header>
      <h1 className="title">Pokemon Catch</h1>
      <h3 className="subtitle">Gotta Catch 'Em All!</h3>
    </header>
    <section className="region-selection">
      {regions.map(region => <button onClick={() => {
        setRegion(region)
        setPokedex([])
        console.log(region)
        // there's a bug here
        //setTimeout(encounterWildPokemon(), 3000)
        }}>{region}</button>)}
    </section>
    <section className="wild-pokemon">
      <h2>Wild Encounter</h2>
      {loading && <h3>Loading Pokemon</h3> } 
      {loading && <CircularProgress />}
      <img src={artChoice() 
      + wildPokemon.id +".png"} className="sprite" alt={wildPokemon.name + "-sprite"}/>
      <h3>{wildPokemon.name}</h3>
      <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
      <button className="catch-btn" onClick={() => {
        encounterWildPokemon()
      }}>RUN</button>
    </section>

    
    <section className="pokedex">
  <h2>{region} Pokedex</h2>
    <h3 className="pokedex-titles">Caught</h3>
      <div className="pokedex-list">
        {pokedex.map(pokemon => (
          <Card className="pokemon" key={pokemon.id}>
              <img src={artChoice()
                    + pokemon.id +".png"} className="sprite" alt={pokemon.name + "-sprite"} />
              <Typography  className={classes.PokemonName} >{pokemon.name.toUpperCase()}</Typography>
              <h3 className="pokedex-number"> {pokemon.id}</h3>
              <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
            
          </Card>
        ))}
      </div>
      <h3 className="pokedex-titles">Seen</h3>
      <div className="pokedex-list">
      {seen.length !== 0 && <Seen results={seen}/>}
        </div>
    </section>
  </div>
  
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
