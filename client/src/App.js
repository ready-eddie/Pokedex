import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import PokemonForm from "./components/PokemonForm";
import EditPokemon from "./components/EditPokemon";
import SearchBar from "./components/SearchBar"

function App() {
  const [pokemon, setResults] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><SearchBar setResults={setResults} /><DisplayAll name={pokemon}/></>} />
          <Route path="/new" element={<PokemonForm />} />
          <Route path="/edit/:id" element={<EditPokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;