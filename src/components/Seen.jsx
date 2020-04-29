import React from "react";


export default ({results}) => (
    
    <>
          {results.map(pokemon => (
          <div className="pokemon" key={pokemon.id}>
              <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
                    + pokemon.id +".png"} className="sprite" alt={pokemon.name + "-sprite"} />
              <h3 className="pokemon-name" >{pokemon.name.toUpperCase()}</h3>
              <h3 className="pokedex-number"> {pokemon.id}</h3>
          </div>
        ))}
    </>
);