import './App.css';
import React, { useState } from 'react';
import ConcursoList from './components/ConcursoList';
import Combinaciones from './components/Combinaciones'; 
import BuscaCombinacion from './components/BuscaCombinacion';

function App() {
  const [view, setView] = useState('concursos'); // Estado para manejar la vista

  return (
    <div className="App container">
      <h1>Lotteries Dashboard</h1>
      <div className="btn-group mb-4" role="group">
        <button className="btn btn-primary" onClick={() => setView('concursos')}>Ver Concursos</button>
        <button className="btn btn-secondary" onClick={() => setView('combinaciones')}>Ver Combinaciones</button>
        <button className="btn btn-info" onClick={() => setView('buscar')}>Buscar Combinación</button> {/* Nuevo botón */}
      </div>

      {view === 'concursos' && <ConcursoList />}
      {view === 'combinaciones' && <Combinaciones />}
      {view === 'buscar' && <BuscaCombinacion />}  {/* Mostrar la vista de búsqueda */}
    </div>
  );
}

export default App;
