import React, { useState, useEffect } from 'react';
import { getFrequentCombinations } from '../api/api';  // Asegúrate de importar la función desde api.js

const Combinaciones = () => {
  const [combinaciones, setCombinaciones] = useState([]);
  const [k, setK] = useState(2); // Tamaño de la combinación

  useEffect(() => {
    const fetchCombinaciones = async () => {
      try {
        const data = await getFrequentCombinations(k);
        console.log('Datos recibidos:', data);  // Consola para ver los datos recibidos
        if (data && data.length > 0) {
          setCombinaciones(data);
        } else {
          console.warn('No se recibieron combinaciones');
        }
      } catch (error) {
        console.error("Error fetching combinaciones", error);
      }
    };

    fetchCombinaciones();
  }, [k]);

  return (
    <div>
      <h2>Combinaciones más Frecuentes (k = {k})</h2>
      <div className="mb-3">
        <label htmlFor="k-select">Tamaño de la Combinación: </label>
        <select id="k-select" value={k} onChange={e => setK(Number(e.target.value))} className="form-control">
          <option value={1}>Un solo número</option>
          <option value={2}>Pares</option>
          <option value={3}>Tríos</option>
          <option value={4}>Cuartetos</option>
          <option value={5}>Quintetos</option>
          <option value={6}>Sextetos</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Combinación</th>
            <th>Frecuencia</th>
          </tr>
        </thead>
        <tbody>
          {combinaciones.map((comb, index) => (
            <tr key={index}>
              <td>{comb.combination ? comb.combination.replace(/,/g, ', ') : 'Datos no disponibles'}</td>
              <td>{comb.frequency !== undefined ? comb.frequency : 'Sin datos'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Combinaciones;
