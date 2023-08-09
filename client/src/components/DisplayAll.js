import { useEffect, useState } from "react";

import "./components.css";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../images/pokedex-logo.png";

const DisplayAll = ({name}) => {
  const [allPokemon, setAllPokemon] = useState([]);
  
  useEffect(() => {
    axios
    .get("http://localhost:8000/api/Pokemon")
    .then((response) => {
      let pokemonList = [...response.data];
      if (name && name.length && pokemonList && pokemonList.length) {
        console.log("hit")
        pokemonList = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
      }
      setAllPokemon(pokemonList);
    })
    .catch((err) => {
      console.log(err.response);
    });
  }, [name]);

  return (
    <div className="display-form">
      <div className="row">
        <div className="col-8">
            {/* <div className="pokemon-header"> */}
                <img class="app_resize-logo" src={logo} alt="app_logo" />
            {/* </div> */}
        <hr/>
          <table className="display-table">
            <thead>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Task</th>
            </thead>
            {/* <tbody> */}
              {allPokemon.map((Pokemon) => {
                console.log(Pokemon)
                return (
                    <tbody className="app__pokemon_grid">
                        <tr key={Pokemon._id}>
                            <td>
                              <Link to={`/edit/${Pokemon._id}`}>
                              {Pokemon.name}</Link>
                              </td>
                            <td>{Pokemon.type}</td>
                            <td>{Pokemon.location}</td>
                            <td>
                            <Link to={`/edit/${Pokemon._id}`}>
                                <button className="edit-button">Edit</button>
                            </Link>
                            </td>
                        </tr>
                  </tbody>
                );
              })}
            {/* </tbody> */}
          </table>
          <div className="pokemon-links">
              <Link classname="new-link" to="/new">
                <button className="button-new">Add Pokemon</button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAll;