// src/components/ProductCard.js
import React from 'react';

function ProductCard({ image, title, description, price, children }) {
  return (
    <div className="w-48 bg-white p-4 border rounded-lg shadow text-center relative">
      <img src={image} alt={title} className="w-full h-auto rounded mb-3" />
      <h3 className="text-lg text-gray-800 mb-2 min-h-[80px] flex items-center justify-center">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-bold text-gray-800 mb-3">{price}</p>
      {children}
    </div>
  );
}

export default ProductCard;
