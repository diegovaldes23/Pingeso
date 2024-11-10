// src/pages/OrderPage.js
import React from 'react';
import './OrderPage.css';

function OrderPage() {
  return (
    <div className="order-page">
      <div className="category-bar">
        <a href="#helados" className="category-link active">Helados</a>
        <a href="#dulces" className="category-link">Dulces</a>
        <a href="#donas" className="category-link">Donas</a>
        <a href="#mas" className="category-link">Más</a>
      </div>
      <h1>Realiza tu Pedido</h1>
      <p>Selecciona los productos que deseas pedir y añádelos a tu carrito.</p>
      <div className="product-list">
        <div className="product-item">
          <img src="/images/product1.png" alt="Producto 1" className="product-image" />
          <h3>Producto 1</h3>
          <p>Descripción breve del producto.</p>
          <button className="add-to-cart">Añadir al carrito</button>
        </div>
        <div className="product-item">
          <img src="/images/product2.png" alt="Producto 2" className="product-image" />
          <h3>Producto 2</h3>
          <p>Descripción breve del producto.</p>
          <button className="add-to-cart">Añadir al carrito</button>
        </div>
        {/* Agrega más productos aquí */}
      </div>
    </div>
  );
}

export default OrderPage;
