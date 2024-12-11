import axios from 'axios';

const BASE_URL = 'http://localhost:8080/admin/orders'; // Cambia según tu API

// Obtener todas las órdenes
export const fetchOrders = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; // Devuelve las órdenes
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        throw error;
    }
};

// Actualizar una orden
export const updateOrder = async (orderId, updatedOrder) => {
    try {
        const response = await axios.put(`${BASE_URL}/${orderId}`, updatedOrder);
        return response.data; // Devuelve la orden actualizada
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
        throw error;
    }
};

// Función para crear un pedido
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${BASE_URL}/post`, orderData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Pedido creado:', response.data);
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        throw error; // Lanza el error para manejarlo donde se llame a la función
    }
};

export const fetchSalesByCommune = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/salesByCommune`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener las ventas por comuna:', error);
        throw error;
    }
};

export const fetchSalesByChannel = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/salesByChannel`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener las ventas por canal:', error);
        throw error;
    }
};

export const fetchProductSales = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orderproduct/product-sales`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener las ventas por producto:', error);
        throw error;
    }
};

export const fetchTopCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/top-customers`);
        return response.json();
    } catch (error) {
        console.error('Error al obtener el top de clientes:', error);
        throw error;
    }
};