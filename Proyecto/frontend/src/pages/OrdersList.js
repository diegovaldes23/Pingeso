import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../utils/GlobalModelContext';
import DatePicker from 'react-datepicker';

const OrdersList = () => {
  const { orders, filteredOrders, getStatusClass, updateOrderDeliveryDate, handleStatusChange, setIsModalOpen, setSelectedOrder } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  // Calcular los índices para la paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
        } else {
          alert('Hubo un error al actualizar el estado del pedido');
        }
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado');
      }
  };
  
  const handleEditClick = (orderId, currentDeliveryDate) => {
    setSelectedOrderId(orderId);
    console.log(currentDeliveryDate);
    console.log(selectedOrderId);
    
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

  const handleSaveDateChange = async () => {
    if (!deliveryDate) {
      alert('Por favor, selecciona una fecha.');
      return;
    }
  
    const formattedDate = deliveryDate.toISOString().split('T')[0]; // Convierte a formato yyyy-MM-dd

    const orderData = {
        id_order: selectedOrderId,
        delivery_date: formattedDate,
    };

    // Aquí podrías hacer la llamada a la API para guardar el cambio en el backend
    try {
      const response = await fetch('http://localhost:8080/admin/orders/delivery-date', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        // Actualiza la orden en el estado global o local

        updateOrderDeliveryDate({id: selectedOrderId, delivery_date: formattedDate});

        alert('Fecha de entrega actualizada correctamente');
        setIsEditing(false); // Cerrar el modal
      } else {
        alert('Hubo un error al actualizar la fecha de entrega');
      }
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la fecha de entrega');
    }
};

    const formatDate2 = (date) => {
        if (!(date instanceof Date) || isNaN(date)) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses empiezan desde 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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
                    <td className="py-1 px-2 border text-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStateChange(order.id, e.target.value)}
                        className={`p-1 rounded ${getStatusClass(order.status)}`}
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
                                onClick={() => handleEditClick(order.id, order.delivery_date)}
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
              <div className="bg-white p-6 rounded-md shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Editar fecha de entrega</h3>
                <DatePicker 
                  placeholderText="dd-MM-yyyy"
                  selected={deliveryDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="p-2 border rounded-md"
                  value={deliveryDate ? formatDate2(deliveryDate): ""}
                />
                <div className="mt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveDateChange}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
            
          )}
        </>
      );
};

export default OrdersList;
