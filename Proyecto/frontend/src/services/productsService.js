import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/products'; // Cambia según tu API

// Obtener todas las órdenes
export const fetchProducts = async () => {
    try {
        const token = localStorage.getItem("authToken");
        // console.log("Token leído:", localStorage.getItem("authToken"));
        if (!token) throw new Error("No autenticado");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(BASE_URL, {headers});
        return response.data; // Devuelve las órdenes
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        throw error;
    }
};

