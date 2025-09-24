import { Routes, Route } from "react-router-dom";
import "./assets/sass/style.scss"

import { PaginaInicio } from "./Inicio"
import { Game } from "./Game";

function App() {

  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/game" element={<Game />} />
      
    </Routes>
  )
}

export default App
