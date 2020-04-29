import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Card,
  Typography
} from "@material-ui/core";

import { PokemonContext } from "../data/PokemonContext";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pokemonName: {
    color: "black",
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
}))



export default ({ props }) => {

  const { pokedex, setPokedex } = useContext(PokemonContext)

  const classes = useStyles();

  const artChoice = () => {
    //return "https://pokeres.bastionbot.org/images/pokemon/"
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
  }

  const releasePokemon = id => {
    // filter everything that is not the id
    setPokedex(state => state.filter(p => p.id !== id))
  }

  {pokedex.map(pokemon => (
    <Card className="pokemon" key={pokemon.id}>
        <img src={artChoice()
              + pokemon.id +".png"} className="sprite" alt={pokemon.name + "-sprite"} />
        <Typography  className={classes.PokemonName} >{pokemon.name.toUpperCase()}</Typography>
        <h3 className="pokedex-number"> {pokemon.id}</h3>
        <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
      
    </Card>
  ))}

}