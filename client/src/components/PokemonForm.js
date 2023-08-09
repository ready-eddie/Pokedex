
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PokemonForm = () => {
  const [name, setPokemonName] = useState("");
  const [type, setPokemonType] = useState("");
  const [description, setPokemonDescription] = useState("");
  const [location, setPokemonLocation] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/pokemon", { name, type, description, location })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate(`/edit/${response.data.newPokemon._id}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };
  return (
    <div className="pokemon-form">
      <div className="row">
        <div className="home-link">
          <Link to="/">Home</Link>
        </div>
        <div className="col-4">
            <div className="pokemon-header">
                <h1>Add a New Pokemon</h1>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label_and_error">
                <label htmlFor="name">Name</label>
                {errors.name ? <p>{errors.name.message}</p> : null}
              </div>
              <input
                className="name-input"
                type="text"
                placeholder="Name of Pokemon"
                onChange={(e) => setPokemonName(e.target.value)}
                value={name}
              />
              <div className="label_and_error">
                  <label htmlFor="type">Type</label>
                  {errors.type ? <p>{errors.type.message}</p> : null}
              </div>
              <input
                className="type-input"
                type="text"
                id="type"
                placeholder="Type"
                value={type}
                onChange={(e) => setPokemonType(e.target.value)}
              />
              <div className="label_and_error">
                  <label htmlFor="description">Description</label>
                  {errors.description ? <p>{errors.description.message}</p> : null}
              </div>
              <textarea
                className="description-input"
                type="text"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setPokemonDescription(e.target.value)}
              />
              <div className="label_and_error">
                  <label htmlFor="location">Location</label>
                  {errors.location ? <p>{errors.location.message}</p> : null}
              </div>
              <input
                className="location-input"
                type="text"
                id="location"
                placeholder="Location where Pokemon was spotted/caught"
                value={location}
                onChange={(e) => setPokemonLocation(e.target.value)}
              />
            <button className="add-button" type="submit">
                Register
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PokemonForm;