import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';
import DatePicker from 'react-datepicker';
import regionsAndCommunes from './RegionesYComunas';
import axios from 'axios';


const OrdersList = () => {
  const { orders, setOrders, filteredOrders, getStatusClass, updateOrderDeliveryDate, handleStatusChange, setIsModalOpen, setSelectedOrder } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [products, setProducts] = useState([{ name: '', quantity: '', cost: 0.0}]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [region, setRegion] = useState(null);

  const selectedRegion = regionsAndCommunes.find(r => r.NombreRegion === region);
  const communes = selectedRegion ? selectedRegion.comunas : [];

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  // Calcular los índices para la paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const addProductField = () => {
    setProducts([...products, { name: '', quantity: ''}]);
};

  // Función para cambiar de página
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Siempre mostrar la primera página
    if (currentPage > 1) {
        pageNumbers.push(1);
    }

    if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }
  
      // Mostrar la página actual
      pageNumbers.push(currentPage);
  
      // Mostrar la página siguiente si no estamos en la última
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }
  
      // Siempre mostrar la última página si no estamos en la última
        if (currentPage < totalPages) {
            pageNumbers.push(totalPages);
        }
  
      return pageNumbers;
};
  const pageNumbers = getPageNumbers();

  useEffect(() => {
    if (selectedOrderId) {
      console.log(selectedOrderId);
    }
  }, [selectedOrderId]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const ordersToDisplay = filteredOrders;

  const currentOrders = ordersToDisplay.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleStateChange = async (orderId, newStatus) => {
    handleStatusChange(orderId, newStatus); // Llamar la función del contexto para actualizar el estado

    const orderStatus = {
        id_order: orderId,
        status: newStatus,
      }

      try {
        const response = await fetch('http://localhost:8080/admin/orders/status', {
          method: 'PUT', // O PATCH dependiendo de tu API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderStatus),
        });
    
        if (response.ok) {
          console.log("Estado del pedido cambiado con éxito");
          window.location.reload();
        } else {
          alert('Hubo un error al actualizar el estado del pedido');
        }
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado');
      } 
  };
  
  const handleEditClick = (orderId, currentDeliveryDate, order) => {
    setSelectedOrderId(orderId);
    setEditOrder(order);
    console.log(currentDeliveryDate);
    console.log(selectedOrderId);

    setProducts(order.orderProducts || []);
    
    // Si currentDeliveryDate es una cadena, convertirla a un objeto Date
    const date = currentDeliveryDate ? new Date(currentDeliveryDate) : null;
    date?.setHours(0, 0, 0, 0);  // Asegura que no tenga hora asignada (día completo)

    console.log(date);
    setDeliveryDate(date); // Establecemos un objeto Date en el estado
    setIsEditing(true);
  };

  const handleDateChange = (date) => {
    if (date) {
        date?.setHours(0, 0, 0, 0); // Asegura que no haya horas
        console.log(date);
        setDeliveryDate(date);
    } 
  };

  const removeProductField = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts); // Actualiza el estado con los productos restantes
  };
  

 
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    // Si se está cambiando el `productId`, actualiza también el `cost`
    if (field === 'name') {
        const selectedProduct = availableProducts.find(p => p.name === value);
        if (selectedProduct) {
            updatedProducts[index].cost = selectedProduct.cost; // Asigna el costo correspondiente
        } else {
            updatedProducts[index].cost = 0; // Si no se encuentra el producto, establece el costo en 0
        }
    }

    // Asegurarse de convertir quantity a número (aunque lo estés haciendo en el useEffect)
    if (field === 'quantity') {
        const quantity = parseInt(value, 10);
        updatedProducts[index].quantity = (quantity > 0 ) ? quantity : ''; // Se asegura de que la cantidad sea un número

    }

    setProducts(updatedProducts);
};

// Calcular el subtotal
useEffect(() => {
    const newSubtotal = products.reduce((acc, product) => {
      if (product.quantity && product.cost) {
        return acc + product.quantity * product.cost;
      }
      return acc;
    }, 0);
  
    setSubtotal(newSubtotal);
  }, [products]);
  
  useEffect(() => {
    const shippingCost = parseFloat(editOrder?.shipping_cost) || 0;
    setTotal(subtotal + shippingCost);
  }, [subtotal, editOrder?.shipping_cost]);
  
  
// Simular llamada al backend para obtener los productos
useEffect(() => {
    const fetchProducts = async () => {
        try {
            // Realizar la solicitud GET para obtener los productos
            const response = await axios.get('http://localhost:8080/admin/products', {
                headers: { 'Content-Type': 'application/json' },
            });

            // Asignar los productos obtenidos al estado
            setAvailableProducts(response.data); // Asegúrate de que la respuesta tenga el formato adecuado (array de productos)
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            alert('Hubo un error al obtener los productos');
        }
    };

    fetchProducts(); // Llamar a la función para obtener los productos
}, []); // El arreglo vacío asegura que esta función se ejecute solo una vez al montar el componente

useEffect(() => {
    // Ordenar filteredOrders por order_date de forma descendente
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const dateA = new Date(a.order_date);
        const dateB = new Date(b.order_date);
        return dateB - dateA; // Devolver negativo para ordenar descendente
    });
    setOrders(sortedOrders); // Asegúrate de tener un estado o contexto para actualizarlos
}, [filteredOrders]);


    const formatDate2 = (date) => {
        if (!(date instanceof Date) || isNaN(date)) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses empiezan desde 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };

    useEffect(() => {
        if(selectedOrderId){
            console.log(selectedOrderId);
        }
    }, [selectedOrderId]);
  
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const handleSaveOrderChange = async () => {
        try {
            // Convierte las fechas al formato ISO-8601 o "yyyy-MM-dd"
        const formattedOrderDate = editOrder.order_date
        ? new Date(editOrder.order_date).toISOString().split('T')[0]
        : null; // Convierte a "yyyy-MM-dd" si es necesario
    const formattedDeliveryDate = editOrder.deliveryDate
        ? new Date(editOrder.deliveryDate).toISOString().split('T')[0]
        : null;

        const updatedOrder = {
            ...editOrder,
            order_date: formattedOrderDate, // Usa el formato correcto
            deliveryDate: formattedDeliveryDate,
            orderProducts: products, // Incluye los productos actualizados
            subtotal: subtotal,
            total: total,
        };

            console.log(updatedOrder.orderProducts);
          const response = await fetch(`http://localhost:8080/admin/orders/${editOrder.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOrder),
          });

          if (response.ok) {
            alert('Pedido actualizado correctamente');
            // Actualiza el estado global (llama una función del contexto para actualizar las órdenes)
            const updatedOrders = orders.map((order) =>
                order.id === editOrder.id ? { ...order, ...updatedOrder } : order
            );
            setOrders(updatedOrders);
      
            setIsEditing(false); // Cierra el modal
          } 
          
        } catch (error) {
          console.error('Error al guardar los cambios:', error);
          alert('Error al guardar los cambios');
        }
      };

    return (
        <>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-purple-800">
              <tr>
                <th className="py-1 px-2 border text-white">ID</th>
                <th className="py-1 px-2 border text-white">Cliente</th>
                <th className="py-1 px-2 border text-white">Teléfono</th>
                <th className="py-1 px-2 border text-white">Comuna</th>
                <th className="py-1 px-2 border text-white">Dirección</th>
                <th className="py-1 px-2 border text-white">Fecha pedido</th>
                <th className="py-1 px-2 border text-white">Productos</th>
                <th className="py-1 px-2 border text-white">Subtotal productos</th>
                <th className="py-1 px-2 border text-white">Valor despacho</th>
                <th className="py-1 px-2 border text-white">Valor total</th>
                <th className="py-1 px-2 border text-white">Estado</th>
                <th className="py-1 px-2 border text-white">Fecha entrega</th>
                <th className="py-1 px-2 border text-white">Descripción</th>
                <th className="py-1 px-2 border text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100 max-h-10 border">
                    <td className="py-1 px-2 border">{order.id}</td>
                    <td className="py-1 px-2 align-middle max-w-18">
                        <div className="line-clamp-1">
                            {order.name}
                        </div>
                    </td>
                    <td className="py-1 px-2 border max-w-18">{order.phone}</td>
                    <td className="py-1 px-2 align-middle max-w-18 border">
                        <div className="line-clamp-1">
                            {order.commune}
                        </div>
                    </td>
                    <td className="py-1 px-2 h-full truncate max-w-12">{order.address}</td>
                    <td className="py-1 px-2 border">{order.order_date ? formatDate(order.order_date) : 'Fecha no disponible'}</td>
                    <td className="py-1 px-2 h-full truncate max-w-12">{order.orderProducts.map((product) => product.name).join(', ')}</td>
                    <td className="py-1 px-2 border font-bold">{order.subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                    <td className="py-1 px-2 border max-w-10">{(order.shipping_cost || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                    <td className="py-1 px-2 border font-bold">{order.total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                    <td className={`${getStatusClass(order.status)}`}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStateChange(order.id, e.target.value)}
                        className={`px-2 ${getStatusClass(order.status)}`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="py-1 px-2 border">{order.delivery_date ? formatDate(order.delivery_date) : 'No asignada'}</td>
                    <td className="py-1 px-2 h-full truncate max-w-12">{order.description}</td>
                    <td className="py-1 px-2 border text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                onClick={() => handleViewDetails(order)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                </svg>
                            </button>
                            <button
                                onClick={() => handleEditClick(order.id, order.delivery_date, order)}
                                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
                                        <path d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352z"/>
                                        <path d="M19.846 4.318a2.2 2.2 0 0 0-.437-.692a2 2 0 0 0-.654-.463a1.92 1.92 0 0 0-1.544 0a2 2 0 0 0-.654.463l-.546.578l2.852 3.02l.546-.579a2.1 2.1 0 0 0 .437-.692a2.24 2.24 0 0 0 0-1.635M17.45 8.721L14.597 5.7L9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.5.5 0 0 0 .255-.145l4.778-5.06Z"/>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    No se encontraron órdenes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-400 text-white rounded-l-md hover:bg-gray-500"
          disabled={currentPage === 1}
        >
          ←
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-400 text-white rounded-r-md hover:bg-gray-500"
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    
          {/* Modal de edición de la fecha de entrega */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md" onSubmit={(e) => {
                e.preventDefault(); // Evita la recarga de la página
                handleSaveOrderChange(); // Llama a tu función para guardar los cambios
            }}>
                <h2 className="text-2xl font-semibold mb-6">Editar pedido</h2>

                {/* Nombre del cliente y Teléfono */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Nombre del cliente</label>
                        <input
                            type="text"
                            value={editOrder.name}
                            onChange={(e) => setEditOrder({ ...editOrder, name: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: Juan Pérez"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            value={editOrder.phone}
                            onChange={(e) => setEditOrder({ ...editOrder, phone: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: 912345678"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />
                    </div>
                </div>
                
                {/* Fecha de pedido */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de pedido</label>
                    <DatePicker 
                            placeholderText={`${editOrder.order_date}`}
                            selected={editOrder.order_date}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="p-2 border rounded-md"
                            value={editOrder.order_date ? formatDate2(editOrder.order_date): ""}
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de entrega</label>
                    <DatePicker 
                        placeholderText="04-06-2024"
                        selected={editOrder.deliveryDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        className="p-2 border rounded-md"
                        value={editOrder.deliveryDate ? formatDate2(editOrder.deliveryDate): ""}
                    />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del pedido (Opcional)</label>
                    <input
                        type="text"
                        value={editOrder.description}
                        onChange={(e) => setEditOrder({ ...editOrder, description: e.target.value })}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="Ej: Pedido para San Valentín"
                        disabled={editOrder.purchase_source === 'Tiendanube'}
                    />
                </div>

                {/* Productos */}
                <div className="mb-4">
                    <label className="block text-gray-700">Productos</label>
                    {products.map((product, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                        {/* Selector de productos */}
                        <select
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        >
                            <option value="">Seleccione un producto</option>
                            {availableProducts.map((prod) => (
                            <option key={prod.id} value={prod.name}>
                                {prod.name}
                            </option>
                            ))}
                        </select>

                        {/* Cantidad */}
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />

                        {/* Botón para eliminar */}
                        <button
                            type="button"
                            onClick={() => removeProductField(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        >
                            Eliminar
                        </button>
                        </div>
                    ))}


                    <button
                        type="button"
                        onClick={addProductField}
                        className="mt-2 text-cyan-500 hover:text-cyan-600"
                        disabled={editOrder.purchase_source === 'Tiendanube'}
                    >
                        + Agregar producto
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Subtotal */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Subtotal</label>
                        <input
                            type="text"
                            value={`$ ${subtotal.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />
                    </div>
                    {/* Costo de envío */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Costo de envío</label>
                        <input
                            type="number"
                            value={editOrder.shipping_cost}
                            onChange={(e) => setEditOrder({ ...editOrder, shipping_cost: parseFloat(e.target.value) }) || 0}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder={`$ ${editOrder.shipping_cost ? editOrder.shipping_cost : 0}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Total</label>
                        <input
                            type="text"
                            value={`$ ${total.toLocaleString()}`}
                            readOnly
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                            disabled={editOrder.purchase_source === 'Tiendanube'}
                        />
                    </div>
                </div>

                {/* Abono inicial */}
                <div className="mb-4">
                    <label className="block text-gray-700">Abono inicial</label>
                    <input
                        type="number"
                        value={editOrder.initial_payment}
                        onChange={(e) => setEditOrder({ ...editOrder, initial_payment: e.target.value }) || 0}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="$ 0"
                    />
                </div>
                

                {/* Estado */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                    value={editOrder.status || ''}
                    onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                    className="mt-1 p-2 border rounded-md w-full"
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                </select>
                </div>

                
                <div className="mt-4 flex flex-row gap-3 justify-end">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="ml-2 px-10 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveOrderChange}
                    className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                </div>
            </form>
            </div>
          )}
        </>
      );
};

export default OrdersList;
