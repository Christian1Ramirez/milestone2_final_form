import React, { useState, useEffect } from "react";
import supabase from '../Services/supabaseClient';
import '../App.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem('team');
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team));
  }, [team]);

  const fetchPokemon = async (searchTerm) => {
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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    fetchPokemon(search);
  };

  const removeFromTeam = (pokemon) => {
    setTeam((prevTeam) => prevTeam.filter((item) => item.Name !== pokemon.Name));
  };

  const isPokemonInTeam = (pokemon) => {
    return team.some((item) => item.Name === pokemon.Name);
  };

  const addToTeam = (pokemon) => {
    if (team.length >= 10) {
      alert('Team is already full!');
      return;
    }
    if (isPokemonInTeam(pokemon)) {
      alert(`${pokemon.Name} is already in the team!`);
      return;
    }
    setTeam((prevTeam) => [...prevTeam, pokemon]);
  };

  const saveTeam = async () => {
    if (!currentUser) {
      alert('Please login to save the team!');
      return;
    }

    try {
      console.log('Team to be saved:', team);

      const { data, error } = await supabase
        .from('team')
        .upsert(team.map((pokemon) => ({ user_id: currentUser.id, pokemon_id: pokemon.Name })));

      if (error) {
        console.error('Error saving team:', error);
        return;
      }

      console.log('Team saved:', data);
      alert('Team saved successfully!');
    } catch (error) {
      console.error('Error saving team:', error.message);
    }
  };

  const getPokemonImage = (pokemonName, pokemonPicture) => {
    const pokemonId = pokemonName.toLowerCase().replace(/\s/g, '-');
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  return (
    <div className="pokedex-container">
      <Navbar />
      <h1 className="pokedex-heading" style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>Pokedex</h1>
      <div className="pokedex-image-container">
        <img
          src="https://e0.pxfuel.com/wallpapers/1023/397/desktop-wallpaper-pokemon-pokedex-background.jpg"
          alt="Pokedex"
          className="pokedex-image"
        />
        <div className="pokedex-pokemon-container">
          {pokemon.map((pokemon, index) => (
            <div key={index} className="pokedex-pokemon-card">
              <img src={getPokemonImage(pokemon.Name)} alt={pokemon.Name} />
            </div>
          ))}
        </div>
      </div>
      <div className="search-bar">
        <input
          className="form-control me-2 search-input"
          type="text"
          placeholder="Search Pokemon..."
          value={search}
          onChange={handleSearch}
        />
        <button className="btn btn-outline-success search-button" onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="team-container">
        <h2 className="team-heading" style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>Team</h2>
        <div className="team-pokemon">
          <button onClick={saveTeam} disabled={team.length === 0} style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>
            Save Team
          </button>

          {team.map((pokemon, index) => (
            <div key={index} className="team-pokemon-card">
              <img src={getPokemonImage(pokemon.Name)} alt={pokemon.Name} />
              <div>
                <h3>{pokemon.Name}</h3>
                <button onClick={() => removeFromTeam(pokemon)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="search-results-container">
        <h2 className="search-results-heading" style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>Search Results</h2>
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
                {currentUser && (
                  <button
                    onClick={() => addToTeam(pokemon)}
                    disabled={isPokemonInTeam(pokemon) || team.length >= 10}
                  >
                    Add to Team
                 </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentUser && (
        <div className="saved-cards-container">
          <h2 className="saved-cards-heading" style={{ fontSize: '32px', color: '#fff', textAlign: 'center', padding: '20px' }}>Saved Team</h2>
          <div className="saved-cards-pokemon">
            {team.map((pokemon, index) => (
              <div key={index} className="saved-cards-pokemon-card">
                <img src={getPokemonImage(pokemon.Name)} alt={pokemon.Name} />
                <div>
                  <h3>{pokemon.Name}</h3>
                  <button onClick={() => removeFromTeam(pokemon)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokedex;