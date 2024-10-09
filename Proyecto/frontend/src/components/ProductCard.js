import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString('es-CL')}</p>
    </div>
  );
}

export default ProductCard;
