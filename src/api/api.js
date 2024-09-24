import axios from 'axios';

const API_URL = 'https://lotteries-backend.onrender.com';  // URL de tu backend

// Función para obtener los concursos
export const getConcursos = async (page, limit) => {
  try {
    const response = await axios.get(`${API_URL}/concursos`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los concursos", error);
    throw error;
  }
};

// Función para obtener las combinaciones más frecuentes
export const getFrequentCombinations = async (k) => {
  try {
    const response = await axios.get(`${API_URL}/combinaciones`, {
      params: { k }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener combinaciones frecuentes", error);
    throw error;
  }
};
