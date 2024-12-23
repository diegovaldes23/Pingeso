import React, { useState, useEffect } from "react";

const GetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8080";

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token no disponible. Inicia sesión nuevamente.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las órdenes");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Error al obtener las órdenes. Verifica tu token.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Órdenes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Comuna</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.commune}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay órdenes disponibles.</p>
      )}
    </div>
  );
};

export default GetOrders;
