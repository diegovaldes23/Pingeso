// src/pages/AdminEditProductPage.js
import React from 'react';
import ProductCard from '../components/ProductCard';

function AdminEditProductPage() {
  return (
    <div className="p-5 font-sans">
      <div className="flex justify-center bg-white py-4 border-b-2 border-gray-300 mb-5">
        <a href="#helados" className="text-gray-700 font-bold uppercase px-5 py-2 hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Helados</a>
        <a href="#dulces" className="text-gray-700 font-bold uppercase px-5 py-2 hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Dulces</a>
        <a href="#donas" className="text-gray-700 font-bold uppercase px-5 py-2 hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Donas</a>
        <a href="#mas" className="text-gray-700 font-bold uppercase px-5 py-2 hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Más</a>
      </div>

      <section id="helados" className="mb-8 text-center">
        <h2 className="text-2xl text-gray-800 mb-4">Helados</h2>
        <div className="flex gap-5 flex-wrap justify-center">
          <ProductCard
            image="/images/brownies.png"
            title="Helado de Chocolate"
            description="Exquisito helado de chocolate belga."
            price="$12.900"
          >
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-700 w-full max-w-xs"
                onClick={() => console.log('Editar Helado de Chocolate')}
              >
                Editar
              </button>
            </div>
          </ProductCard>

          <ProductCard
            image="/images/brownies.png"
            title="Helado de Vainilla"
            description="Cremoso helado de vainilla."
            price="$11.500"
          >
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-700 w-full max-w-xs"
                onClick={() => console.log('Editar Helado de Vainilla')}
              >
                Editar
              </button>
            </div>
          </ProductCard>

          <ProductCard
            image="/images/brownies.png"
            title="Helado de Fresa"
            description="Helado de fresa con trozos naturales."
            price="$10.900"
          >
            <div className="flex justify-center mt-2">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-700 w-full max-w-xs"
                onClick={() => console.log('Editar Helado de Fresa')}
              >
                Editar
              </button>
            </div>
          </ProductCard>
        </div>
      </section>
    </div>
  );
}

export default AdminEditProductPage;
