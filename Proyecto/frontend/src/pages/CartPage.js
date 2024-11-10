// src/pages/CartPage.js
import React from 'react';
import './CartPage.css';

function CartPage() {
  return (
    <div className="cart-page">
      <div className="cart-items">
        <div className="cart-item">
          <img src="/images/helado.png" alt="Helados" className="product-image" />
          <div className="product-details">
            <h3>Helados (6 unidades)</h3>
            <p>$11.990</p>
          </div>
          <div className="quantity-control">
            <button className="quantity-btn">-</button>
            <span>1</span>
            <button className="quantity-btn">+</button>
          </div>
          <button className="remove-btn">Eliminar</button>
        </div>
        <div className="cart-item">
          <img src="/images/brownies.png" alt="Brownies" className="product-image" />
          <div className="product-details">
            <h3>Brownies (3 unidades)</h3>
            <p>$6.990</p>
          </div>
          <div className="quantity-control">
            <button className="quantity-btn">-</button>
            <span>1</span>
            <button className="quantity-btn">+</button>
          </div>
          <button className="remove-btn">Eliminar</button>
        </div>
        {/* Agrega más productos si es necesario */}
      </div>
      
      <div className="cart-summary">
        <h2>Resumen de compra</h2>
        <div className="summary-details">
          <p>Costo de tus productos</p>
          <p>$18.980</p>
        </div>
        <button className="checkout-btn">Continuar con la compra</button>
      </div>
    </div>
  );
}

export default CartPage;
