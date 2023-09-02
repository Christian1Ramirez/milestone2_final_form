import React, { useState } from "react";
import supabase from './Services/supabaseClient';
import Navbar from "./Navbar";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState([]);

  const fetchPokemon = async (searchTerm: string) => {
    console.log("Fetching Pokemon with term: ", searchTerm);
    let { data: pokemonStats, error } = await supabase
      .from('pokemon_stats')
      .select('*')
      .ilike('Name', `%${searchTerm}%`);
    if (error) {
      console.log("Data fetch error: ", error);
    } else {
      console.log("Fetched data: ", pokemonStats);
      setPokemon(pokemonStats);
    }
  };

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    fetchPokemon(search);
  };

  const removeFromTeam = (pokemon: never) => {
    setTeam((prevTeam) => prevTeam.filter((item) => item !== pokemon));
  };

  const isPokemonInTeam = (pokemon: never) => {
    return team.some((item) => item.Name === pokemon.Name);
  };

  const addToTeam = (pokemon: never) => {
    if (team.length >= 6) {
      alert('Team is already full!');
      return;
    }
    if (isPokemonInTeam(pokemon)) {
      alert(`${pokemon.Name} is already in the team!`);
      return;
    }
    setTeam((prevTeam) => [...prevTeam, pokemon]);
  };

  return (
    <div className="pokedex-container">
      <Navbar />
      <h1 className="pokedex-heading">Pokedex</h1>
      <div className="pokedex-image-container">
        <img
          src="https://e0.pxfuel.com/wallpapers/1023/397/desktop-wallpaper-pokemon-pokedex-background.jpg"
          alt="Pokedex"
          className="pokedex-image"
        />
        <div className="pokedex-pokemon-container">
          {pokemon.map((pokemon, index) => (
            <div key={index} className="pokedex-pokemon-card">
              <img src={pokemon.Picture} alt={pokemon.Name} />
            </div>
          ))}
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Pokemon"
          value={search}
          onChange={handleSearch}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="team-container">
        <h2 className="team-heading">Team</h2>
        <div className="team-pokemon">
          {team.map((pokemon, index) => (
            <div key={index} className="team-pokemon-card">
              <img src={pokemon.Picture} alt={pokemon.Name} />
              <div>
                <h3>{pokemon.Name}</h3>
                <button onClick={() => removeFromTeam(pokemon)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="search-results-container">
        <h2 className="search-results-heading">Search Results</h2>
        <div className="search-results-pokemon">
          {pokemon.map((pokemon, index) => (
            <div key={index} className="search-results-pokemon-card">
              
              <div>
                <h3>{pokemon.Name}</h3>
                <p>
                  Number: {pokemon.Number} <br />
                  Fact: {pokemon.Fact} <br />
                  Type: {pokemon.Type} <br />
                  Height: {pokemon.Height} <br />
                  Weight: {pokemon.Weight} <br />
                  Gender: {pokemon.Gender} <br />
                  Category: {pokemon.Category} <br />
                  Abilities: {pokemon.Abilities} <br />
                  Weaknesses: {pokemon.Weaknesses} <br />
                  Hit Points: {pokemon.Hit_points} <br />
                  Attack: {pokemon.Attack} <br />
                  Defense: {pokemon.Defense} <br />
                  Special Attack: {pokemon.Special_attack} <br />
                  Special Defense: {pokemon.Special_defense} <br />
                  Speed: {pokemon.Speed} <br />
                </p>
                <button
                  onClick={() => addToTeam(pokemon)}
                  disabled={isPokemonInTeam(pokemon) || team.length >= 6}
                >
                  Add to Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
