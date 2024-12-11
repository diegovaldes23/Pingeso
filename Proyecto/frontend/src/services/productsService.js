import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/products'; // Cambia según tu API

// Obtener todas las órdenes
export const fetchProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; // Devuelve las órdenes
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        throw error;
    }
};

