import axios from 'axios';
import log from 'loglevel';

// Set logging level for frontend debugging
log.setLevel('debug');

const API_URL = 'https://lotteries-backend.onrender.com';  // URL de tu backend

// Función para obtener los concursos
export const getConcursos = async (page, limit) => {
  try {
    log.debug("Fetching contests with page:", page, "limit:", limit);  // Log the API call
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
    log.debug("Fetching frequent combinations with k:", k);  // Log the API call
    const response = await axios.get(`${API_URL}/combinaciones`, {
      params: { k }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener combinaciones frecuentes", error);
    throw error;
  }
};

// Function to get the total number of contests
export const getTotalConcursos = async () => {
  try {
    log.debug("Fetching total number of contests");  // Log the API call
    const response = await axios.get(`${API_URL}/total-concursos`);
    return response.data.total;
  } catch (error) {
    console.error("Error al obtener el número total de concursos", error);
    throw error;
  }
};

// Función para hacer la consulta de combinaciones
export const buscaCombinacion = async (numeros) => {
  try {
    log.debug("Searching combination for numbers:", numeros);  // Log the input numbers
    const response = await axios.post(`${API_URL}/buscar-combinacion`, { numeros });
    log.debug("Search result:", response.data);  // Log the search result
    return response.data;
  } catch (error) {
    log.error("Error searching combination:", error);  // Log any error
      throw error;
  }
};


