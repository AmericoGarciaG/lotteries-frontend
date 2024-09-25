import React, { useState, useEffect } from 'react';
import { getFrequentCombinations, getTotalConcursos } from '../api/api';  // Asegúrate de importar la función para obtener el total de concursos

const Combinaciones = () => {
  const [combinaciones, setCombinaciones] = useState([]);
  const [totalConcursos, setTotalConcursos] = useState(1);  // Guardar el número total de concursos
  const [k, setK] = useState(1); // Tamaño de la combinación

  useEffect(() => {
    // Obtener el número total de concursos al cargar la página
    const fetchTotalConcursos = async () => {
      try {
        const total = await getTotalConcursos();
        setTotalConcursos(total);
      } catch (error) {
        console.error("Error fetching total concursos", error);
      }
    };

    // Obtener las combinaciones
    const fetchCombinaciones = async () => {
      try {
        const data = await getFrequentCombinations(k);
        setCombinaciones(data);
      } catch (error) {
        console.error("Error fetching combinaciones", error);
      }
    };

    fetchTotalConcursos();  // Obtener total de concursos
    fetchCombinaciones();  // Obtener combinaciones
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
            <th>%</th> {/* Nueva columna para el porcentaje */}
          </tr>
        </thead>
        <tbody>
          {combinaciones.map((comb, index) => (
            <tr key={index}>
              <td>{comb.combination ? comb.combination.replace(/,/g, ', ') : 'Datos no disponibles'}</td>
              <td>{comb.frequency !== undefined ? comb.frequency : 'Sin datos'}</td>
              <td>{comb.frequency !== undefined ? ((comb.frequency / totalConcursos) * 100).toFixed(2) + '%' : 'Sin datos'}</td> {/* Cálculo del porcentaje */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Combinaciones;
