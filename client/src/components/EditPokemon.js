import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditPokemon = (props) => {
  const { id } = useParams();
  const [name, setPokemonName] = useState("");
  const [type, setPokemonType] = useState("");
  const [description, setPokemonDescription] = useState("");
  const [location, setPokemonLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [pokemonNotFoundError, setPokemonNotFoundError] = useState("");
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pokemon/${id}`)
      .then((response) => {
        console.log(response.data);
        setPokemonName(response.data.name);
        setPokemonType(response.data.type);
        setPokemonDescription(response.data.description);
        setPokemonLocation(response.data.location);
      })
      .catch((err) => {
        console.log(err.response);
        setPokemonNotFoundError(`Pokemon not found using that ID`);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/pokemon/${id}`, { name, type, description, location })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  const handleDeletePokemon = (id) => {
    axios
      .delete(`http://localhost:8000/api/pokemon/${id}`)
      .then((response) => {
        console.log("success deleting pokemon");
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log("error deleting pokemon", err.response);
      });
  };
  
  return (
    <>
        <div className="pokemon-edit-form">
          <form onSubmit={submitHandler}>
          <div className="pokemon-header">
            <h1>Pokemon</h1>
            {pokemonNotFoundError ? (
              <h2>
                {pokemonNotFoundError} <Link to="/new">Click here to add pokemon</Link>
              </h2>
            ) : null}
            <div className="edit-link">
              <Link to="/">Go to Pokedex</Link>
            </div>
          </div>
          <h1 className="pokemon-name">{name}</h1>
          <div className="edit-form">
            <div className="edit-row">
              <div className="label_and_error">
                    <label htmlFor="type">Type</label>
                    {errors.type ? <p>{errors.type.message}</p> : null}
              </div>
              <input
                className="type-input"
                type="text"
                id="type"
                value={type}
                onChange={(e) => setPokemonType(e.target.value)}
              />
            </div>
            <div className="edit-row">
              <div className="label_and_error">
                    <label htmlFor="description">Description</label>
                    {errors.description ? <p>{errors.description.message}</p> : null}
              </div>
              <textarea
                className="description-input"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setPokemonDescription(e.target.value)}
              />
            </div>
            <div className="edit-row">
              <div className="label_and_error">
                    <label htmlFor="location">Location</label>
                    {errors.location ? <p>{errors.location.message}</p> : null}
              </div>
              <input
                className="location-input"
                type="text"
                id="location"
                value={location}
                onChange={(e) => setPokemonLocation(e.target.value)}
              />
            </div>
        </div>
            <button type="submit" className="edit-buttons">
                Update Pokemon
            </button>
            </form>
            <button
                    onClick={() => handleDeletePokemon(id)}
                    className="edit-buttons">
                    Delete
            </button>
          
        </div>
    </>
  );
};

export default EditPokemon;