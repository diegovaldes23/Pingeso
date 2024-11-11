import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="text-center rounded-lg p-4 bg-white shadow-md w-[220px] m-2 transform transition-transform duration-300 hover:scale-105 sm:w-[180px]">
      <img src={product.img} alt={product.name} className="w-full h-[150px] object-cover rounded-lg" />
      <h3 className="mt-4 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600">${product.price.toLocaleString('es-CL')}</p>
    </div>
  );
}

export default ProductCard;
