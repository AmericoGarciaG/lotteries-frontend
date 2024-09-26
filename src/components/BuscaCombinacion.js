import React, { useState } from 'react';
import { buscaCombinacion } from '../api/api';  // Asegúrate de tener este endpoint en el backend
import log from 'loglevel';

// Establecer el nivel de logging
log.setLevel('debug');

// Usar los niveles de logging
log.debug('Componente de Buscar Combinación iniciado');

// Component principal para buscar combinaciones
const BuscaCombinacion = () => {
  const [input, setInput] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  // Valida y limpia la entrada de números
const validarFormato = (input) => {
  const cleanedInput = input.replace(/[,|\-|\s]+/g, ' ').trim();
  const numeros = cleanedInput.split(' ').map(Number);

  // Acepta entre 1 y 6 números, y valida que estén entre 1 y 56
  if (numeros.length > 6 || numeros.some(num => isNaN(num) || num < 1 || num > 56)) {
      setError('Formato inválido. Ingrese entre 1 y 6 números separados por espacio, coma o guion, entre 1 y 56.');
      log.error('Error en el formato ingresado por el usuario:', numeros);
      return null;
  }
  // Agregamos un log para verificar los números validados
  log.debug('Números validados ingresados por el usuario:', numeros);

  return numeros;
};

// Función que maneja el submit del formulario  
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    const numeros = validarFormato(input);
    if (!numeros) return;

    try {
      const data = await buscaCombinacion(numeros);  // Enviar los números al backend
      log.debug('Resultado de la consulta del backend:', data);
      setResultado(data);
    } catch (error) {
      setError('Hubo un error al buscar la combinación.');
      log.error('Error al consultar la combinación en el backend:', error);
    }
  };

  return (
    <div className="busca-combinacion">
      <h2>Buscar Combinación</h2>
      <p>Ingrese entre 1 y 6 números separados por espacio, coma o guion. Ejemplo: 1 2 3 4 5 6</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ejemplo: 1 2 3 4 5 6"
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {resultado && (
        <div className="resultado mt-3">
          {resultado.existe ? (
            <p>La combinación ha aparecido {resultado.frecuencia} veces.</p>
          ) : (
            <p>La combinación no ha aparecido en los concursos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BuscaCombinacion;
