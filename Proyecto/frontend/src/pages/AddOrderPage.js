import React, { useState, useEffect } from 'react';

import axios from 'axios';

function AddOrderPage() {
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState(''); // Nueva variable para dirección
    const [email, setEmail] = useState(''); // Nueva variable para email
    const [description, setDescription] = useState(''); // Nueva variable para descripcion
    const [comment, setComment] = useState(''); // Nueva variable para comentario
    const [dispatch, setDispatch] = useState(''); // Nueva variable para dispatch
    const [products, setProducts] = useState([{ productId: '', quantity: '', price: 0 }]);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [status, setStatus] = useState('Pendiente');
    const [customerType, setCustomerType] = useState('');
    const [purchaseSource, setPurchaseSource] = useState('');
    const [initialPayment, setInitialPayment] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [availableProducts, setAvailableProducts] = useState([]);

    // Simular llamada al backend para obtener los productos
    useEffect(() => {
        const fetchProducts = async () => {
            const mockProducts = [
                { id: '1', name: 'Helado de Chocolate', price: 6000 },
                { id: '2', name: 'Tarta de Manzana', price: 7000 },
                { id: '3', name: 'Brownie de Nueces', price: 5000 },
                { id: '4', name: 'Galletas de Chocolate', price: 4500 },
            ];
            setAvailableProducts(mockProducts);
        };

        fetchProducts();
    }, []);

    

    // Calcular el subtotal
    useEffect(() => {
        const newSubtotal = products.reduce((acc, product) => {
            const productInfo = availableProducts.find((p) => p.id === product.productId);
            if (productInfo && product.quantity) {
                return acc + productInfo.price * product.quantity;
            }
            return acc;
        }, 0);
        setSubtotal(newSubtotal);
    }, [products, availableProducts]);

    useEffect(() => {
        setTotal(subtotal + Number(deliveryCost));
    }, [subtotal, deliveryCost]);

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const addProductField = () => {
        setProducts([...products, { productId: '', quantity: '', price: 0 }]);
    };

    const createOrder = async (orderData) => {
        try {
            const response = await axios.post('http://localhost:8080/admin/orderproduct/post', orderData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Pedido creado:', response.data);
            alert('Pedido creado con éxito');
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            alert('Hubo un error al crear el pedido');
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!customerName || !phone || !region || !commune || products.length === 0) {
            alert('Por favor, complete todos los campos requeridos');
            return;
        }
    
        // Construir la fecha y hora en el formato ISO
        const orderDateTime = `${date}T10:00:00`;
    
        // Preparar datos para enviar
        const orderData = {
            name: customerName,
            phone,
            region,
            commune,
            order_date: orderDateTime,
            customer_type: customerType,
            purchase_source: purchaseSource,
            shipping_cost: parseFloat(deliveryCost),
            subtotal: parseFloat(subtotal),
            initial_payment: parseFloat(initialPayment),
            status,

            description,
            address, // Agregar un campo para la dirección
            city: `${region}, ${commune}`,
            email,
            dispatch, // Puedes agregar un campo para seleccionar esto
            comment,
            orders: products.map(product => ({
                id_product: parseInt(product.productId, 10),
                quantity: parseInt(product.quantity, 10),
            })),
        };
    
        console.log('Datos enviados al backend:', orderData);
    
        // Llamar a la función para enviar los datos
        await createOrder(orderData);
    };
    
    

    return (
        <div className="flex justify-center items-center bg-gray-50 min-h-screen">
            <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6">Crear Pedido</h2>

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
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: 912345678"
                        />
                    </div>
                </div>

                {/* Región y Comuna */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Región</label>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Seleccione región</option>
                            <option value="Región Metropolitana">Región Metropolitana</option>
                            <option value="Valparaíso">Valparaíso</option>
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
                            <option value="Santiago">Santiago</option>
                            <option value="Providencia">Providencia</option>
                        </select>
                    </div>
                </div>

                {/* Dirección */}
                <div className="mb-4">
                    <label className="block text-gray-700">Dirección</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="Ej: Walker Martínez 3142"
                    />
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
                

                {/* Fecha de pedido */}
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de pedido</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Productos */}
                <div className="mb-4">
                    <label className="block text-gray-700">Productos</label>
                    {products.map((product, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                            <select
                                value={product.productId}
                                onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccione producto</option>
                                {availableProducts.map((prod) => (
                                    <option key={prod.id} value={prod.id}>
                                        {prod.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
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

                {/* Tipo de cliente y cómo fue la compra */}
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                        <label className="block text-gray-700">Cómo fue la compra</label>
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

                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Costo de envío */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Costo de envío</label>
                        <input
                            type="number"
                            value={deliveryCost}
                            onChange={(e) => setDeliveryCost(parseFloat(e.target.value) || 0)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="$ 2990"
                        />
                    </div>

                    {/* Subtotal */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Subtotal</label>
                        <input
                            type="text"
                            value={`$ ${subtotal.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>
                </div>
                
                {/* Total */}
                <div className="mb-4">
                        <label className="block text-gray-700">Total</label>
                        <input
                            type="text"
                            value={`$ ${total.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>

                {/* Abono inicial */}
                <div className="mb-4">
                    <label className="block text-gray-700">Abono inicial</label>
                    <input
                        type="number"
                        value={initialPayment}
                        onChange={(e) => setInitialPayment(parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="$ 0"
                    />
                </div>

                {/* Estado */}
                <div className="mb-4">
                    <label className="block text-gray-700">Estado</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                {/* Email y Comentario */}
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                    <div>
                        <label className="block text-gray-700">Comentario (Opcional)</label>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Añadir un comentario"
                        />
                    </div>
                </div>

                {/* Dispatch */}
                <div className="mb-4">
                    <label className="block text-gray-700">Método de Despacho</label>
                    <select
                        value={dispatch}
                        onChange={(e) => setDispatch(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Seleccione método de despacho</option>
                        <option value="empresas 8k">Empresas 8k</option>
                        <option value="bluexpress">Bluexpress</option>
                        <option value="envio pymes">Envío Pymes</option>
                        <option value="uber">Uber</option>
                        <option value="retiro">Retiro</option>
                    </select>
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
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Crear pedido
                    </button>
                </div>
                
            </form>
        </div>
    );
}

export default AddOrderPage;
