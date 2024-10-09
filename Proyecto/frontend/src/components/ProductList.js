import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const products = [
    { id: 1, name: 'Macarons (24 unidades)', price: 19990, img: '/images/macarron.png' },
    { id: 2, name: 'Budcake (2 unidades)', price: 14990, img: '/images/helado.png' },
    { id: 3, name: 'Helados (6 unidades)', price: 11990, img: '/images/helado2.png' },
    { id: 4, name: 'Brownies (3 unidades)', price: 6990, img: '/images/brownies.png' }
  ];

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
