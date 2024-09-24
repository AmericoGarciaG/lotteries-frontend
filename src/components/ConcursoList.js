import React, { useState, useEffect } from 'react';
import { getConcursos } from '../api/api';  // Asegúrate de importar la función desde api.js

const ConcursoList = () => {
  const [concursos, setConcursos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(100); // Eliminamos setLimit porque no se usa

  useEffect(() => {
    const fetchConcursos = async () => {
      try {
        const data = await getConcursos(page, limit);
        // Ordenar los concursos en orden descendente según el número de CONCURSO
        const sortedConcursos = data.sort((a, b) => b.CONCURSO - a.CONCURSO);
        setConcursos(sortedConcursos);
      } catch (error) {
        console.error("Error fetching concursos", error);
      }
    };
    
    fetchConcursos();
  }, [page, limit]);

  // Función para formatear la bolsa como moneda
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="container">
      <h1>Concursos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Concurso</th>
            <th>Fecha</th>
            <th>Premio</th>
            <th>Resultados</th>
          </tr>
        </thead>
        <tbody>
          {concursos.map(concurso => (
            <tr key={concurso.CONCURSO}>
              <td>{concurso.CONCURSO}</td>
              <td>{concurso.FECHA}</td>
              <td>{formatCurrency(concurso.BOLSA)}</td> {/* Formato de moneda */}
              <td>{`${concurso.R1}, ${concurso.R2}, ${concurso.R3}, ${concurso.R4}, ${concurso.R5}, ${concurso.R6}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Página Anterior
        </button>
        <button onClick={() => setPage(page + 1)}>
          Página Siguiente
        </button>
      </div>
    </div>
  );
};

export default ConcursoList;
