import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.module.css";
import regionsAndCommunes from './RegionesYComunas';
import {format} from 'date-fns';

import axios from 'axios';
import { unicode } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { get } from 'lodash';

function AddOrderPage() {
    // Estados para almacenar la información del formulario
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState(''); // Nueva variable para dirección
    const [email, setEmail] = useState(''); // Nueva variable para email
    const [description, setDescription] = useState(''); // Nueva variable para descripcion
    const [products, setProducts] = useState([{ name: '', quantity: '', cost: 0.0}]);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [status, setStatus] = useState('Pendiente');
    const [customerType, setCustomerType] = useState('');
    const [purchaseSource, setPurchaseSource] = useState('');
    const [initialPayment, setInitialPayment] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState(''); // Nueva variable para fecha de entrega

    // Función para convertir la fecha a formato ISO (yyyy-MM-dd)
    function formatDateToDDMMYYYY(dateString) {

        // Convierte la cadena a un objeto Date
        const date = new Date(dateString);

        // Extrae y asegura que el día tenga 2 dígitos
        const day = String(date.getDate()).padStart(2, '0'); 

        // Extrae el mes (agregando 1 porque los meses comienzan desde 0)
        const month = String(date.getMonth() + 1).padStart(2, '0'); 

        // Extrae el año
        const year = date.getFullYear(); // Extrae el año
    
        // Formatea como yyyy-MM-dd
        return `${year}-${month}-${day}`; // Formatea como dd-MM-yyyy
    }

    // Filtración de las comunas basadas en la región seleccionada
    const selectedRegion = regionsAndCommunes.find(r => r.NombreRegion === region);
    const communes = selectedRegion ? selectedRegion.comunas : [];

    // Función para manejar cambios en el input de fecha
    const handleDateChange = (date) => {
        setDate(date ? new Date(date) : null); // Convierte a Date o establece en null
    };

    const handleDeliveryDateChange = (date) => {
        setDeliveryDate(date ? new Date(date) : null); // Convierte a Date o establece en null
    };

    
    const removeProductField = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts); // Actualiza el estado con los productos restantes
    };
    

    // Llamada al backend para obtener productos disponibles
    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const token = localStorage.getItem("authToken"); 
                if (!token) throw new Error("No autenticado");
                // const headers = { Authorization: `Bearer ${token}` };

                const response = await axios.get("http://192.81.208.123:8080/admin/products", {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
                    
                });
                
                setAvailableProducts(response.data); 
            } catch (error) {
                alert('Hubo un error al obtener los productos');
            }
        };
    
        fetchProducts(); 
    }, []); 
    
    // Función para manejar cambios en los productos seleccionados
    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
    
        // Si se está cambiando el `productId`, actualiza también el `cost`
        if (field === 'name') {
            const selectedProduct = availableProducts.find(p => p.name === value);
            if (selectedProduct) {
                updatedProducts[index].cost = selectedProduct.cost; 
            } else {
                updatedProducts[index].cost = 0;
            }
        }
    
        // Asegurarse de convertir quantity a número 
        if (field === 'quantity') {
            const quantity = parseInt(value, 10);
            updatedProducts[index].quantity = (quantity > 0 ) ? quantity : ''; 

        }
    
        // Actualiza el estado de los productos
        setProducts(updatedProducts);
    };

    // Calcula el total cada vez que el subtotal o el costo de envío cambian
    useEffect(() => {
        const newTotal = subtotal + deliveryCost;
        setTotal(newTotal);
    }, [subtotal, deliveryCost]);
        
    // Calcular el subtotal de los productos seleccionados
    useEffect(() => {
        console.log("Available Products:", availableProducts);
        const newSubtotal = products.reduce((acc, product) => {
            const productInfo = availableProducts.find((p) => p.name === product.name);
            console.log(availableProducts.find((p) => p.name === product.name));
            if (productInfo && product.quantity) {
                return acc + product.cost * product.quantity;
            }
            return acc;

        }, 0);
        console.log("Products:", products);
        setSubtotal(newSubtotal);
    }, [products, availableProducts]);

    const addProductField = () => {
        setProducts([...products, { name: '', quantity: ''}]);
    };

    const createOrder = async (orderData) => {
        try {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token);

            if (!token) {
                throw new Error("No autenticado: Token no encontrado");
            }
    
            const response = await axios.post('http://192.81.208.123:8080/admin/orders/post', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Pedido creado:', response.data);
            alert('Pedido creado con éxito');
        } catch (error) {
            console.error('Error al crear el pedido:', error.response?.data || error.message);
            alert(`Hubo un error al crear el pedido: ${error.response?.data?.message || error.message}`);
        }
    };
    
    const handleInputChange = (event, setter) => {
        const rawValue = event.target.value;
    
        // Eliminar caracteres no numéricos (excepto números)
        const sanitizedValue = rawValue.replace(/[^0-9]/g, "");
    
        // Convertir el valor a número y asegurarse de que sea mayor o igual a 0
        const numericValue = Math.max(0, parseInt(sanitizedValue, 10) || 0);
    
        // Actualizar el estado con el valor formateado
        setter(numericValue);
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!customerName || !phone || !region || !commune || products.length === 0) {
            alert('Por favor, complete todos los campos requeridos');
            return;
        }
    
        // Convierte las fechas al formato "yyyy-MM-dd"
    const formattedOrderDate = date ? format(new Date(date), "yyyy-MM-dd") : null;
    const formattedDeliveryDate = deliveryDate ? format(new Date(deliveryDate), "yyyy-MM-dd") : null;

        // Preparar datos para enviar
        const orderData = {
            name: customerName,
            phone: `+569${phone}`,
            region,
            commune,
            order_date: formattedOrderDate,
            delivery_date: formattedDeliveryDate,
            customer_type: customerType,
            purchase_source: purchaseSource,
            shipping_cost: parseFloat(deliveryCost),
            subtotal: parseFloat(subtotal),
            total: parseFloat(total),
            initial_payment: parseFloat(initialPayment),
            status,
            description,
            address, // Agregar un campo para la dirección
            email,
            orderProducts: products.map(product => ({
                name: product.name,
                quantity: parseInt(product.quantity, 10),
                unit_cost: product.cost,
            })),
            username_creator: localStorage.getItem('username'),
        };
    
        console.log('Datos enviados al backend:', orderData);
    
        // Llamar a la función para enviar los datos
        await createOrder(orderData);
    };    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6">Agregar pedido</h2>

                {/* Nombre del cliente y Teléfono */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Nombre del cliente</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Teléfono</label>
                        <div className="flex mt-1 items-center border border-gray-300 rounded-md">
                            {/* Prefijo fijo */}
                            <span className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md">
                                +569
                            </span>
                            {/* Campo de entrada */}
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => {
                                    const input = e.target.value;

                                    // Validar que solo se ingresen números
                                    const sanitizedInput = input.replace(/\D/g, '');

                                    // Limitar la longitud máxima a 8 caracteres
                                    if (sanitizedInput.length <= 8) {
                                        setPhone(sanitizedInput);
                                    }
                                }}
                                className="flex-1 px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="12345678"
                            />
                        </div>
                        {/* Mensaje de error */}
                        {phone && phone.length !== 8 && phone.length !== 12 && (
                            <span className="text-red-500 text-sm">
                                El número debe tener exactamente 8 dígitos.
                            </span>
                        )}
                    </div>
                </div>


                {/* Región, Comuna y Dirección en la misma fila */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Región</label>
                        <select
                            value={region}
                            onChange={(e) => {
                                setRegion(e.target.value);
                                setCommune(""); // Limpiamos la comuna cuando cambiamos la región
                            }}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Seleccione región</option>
                            {regionsAndCommunes.map((r) => (
                                <option key={r.NombreRegion} value={r.NombreRegion}>
                                    {r.NombreRegion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Comuna</label>
                        <select
                            value={commune}
                            onChange={(e) => setCommune(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            disabled={!region}
                        >
                            <option value="">Seleccione comuna</option>
                            {communes.map((commune) => (
                                <option key={commune} value={commune}>
                                    {commune}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Dirección</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 w-full py-2 border border-gray-300 rounded-md p-2"
                            placeholder="Ej: Walker Martínez 3142"
                        />
                    </div>
                </div>

                {/* Tipo de cliente, Fuente de compra y Fecha */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Tipo de cliente</label>
                        <select
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Seleccione tipo</option>
                            <option value="Antiguo">Antiguo</option>
                            <option value="Nuevo">Nuevo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Tipo de compra</label>
                        <select
                            value={purchaseSource}
                            onChange={(e) => setPurchaseSource(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Seleccione fuente</option>
                            <option value="Facebook Ads">Facebook Ads</option>
                            <option value="Orgánico">Orgánico</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Fecha de pedido</label>
                        <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholderText="Seleccione fecha"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Fecha de entrega</label>
                        <DatePicker
                            selected={deliveryDate}
                            onChange={handleDeliveryDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholderText="Seleccione fecha"
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del pedido (Opcional)</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="Ej: Pedido para San Valentín"
                    />
                </div>

                {/* Productos */}
                <div className="mb-4">
                    <label className="block text-gray-700">Productos</label>
                    {products.map((product, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                            <select
                                value={product.name}
                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccione producto</option>
                                {availableProducts.length > 0 ? (
                                    availableProducts.map((prod) => (
                                        <option key={prod.id} value={prod.id}>
                                            {prod.name} {/* Aquí mostramos el nombre en español */}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Cargando productos...</option>
                                )}
                            </select>
                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                            {/* Botón para eliminar */}
                            <button
                                type="button"
                                onClick={() => removeProductField(index)}
                                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addProductField}
                        className="mt-2 text-cyan-500 hover:text-cyan-600"
                    >
                        + Agregar producto
                    </button>
                </div>

                {/* Subtotal, Costo de envío y Total */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Subtotal</label>
                        <input
                            type="text"
                            value={`$ ${subtotal.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Costo de envío</label>
                        <input
                            type="text"
                            value={deliveryCost.toLocaleString()}
                            onChange={(e) => handleInputChange(e, setDeliveryCost)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Total</label>
                        <input
                            type="text"
                            value={`$ ${total.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Abono inicial */}
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Abono inicial</label>
                        <input
                            type="text"
                            value={initialPayment.toLocaleString()}
                            onChange={(e) => handleInputChange(e, setInitialPayment)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>


                {/* Email */}
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Email (Opcional)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: cliente@correo.com"
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => console.log('Cancelar')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Crear pedido
                    </button>
                </div>
                
            </form>
        </div>
    );
}

export default AddOrderPage;
