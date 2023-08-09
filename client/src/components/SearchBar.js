import { useState } from "react";

import "./Searchbar.css"

const SearchBar = ({ setResults }) => {
    const [name, setPokemon] = useState("");
    const sendPokemon = (pokemon) => {
        return setResults(pokemon)
    }
    
    const handleChange = (value) => {
        setPokemon(value)
        sendPokemon(value);
    };
    return (
        <div className="searchbar-container">
            <input
                className="searchbar-input"
                placeholder="Search Pokemon..."
                value={name}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
      
}

export default SearchBar