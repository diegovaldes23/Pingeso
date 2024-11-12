import React from 'react';

function CartPage() {
  return (
    <div className="flex justify-between p-5 max-w-5xl mx-auto">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <img src="/images/helado.png" alt="Helados" className="w-24 h-24 rounded-lg object-cover mr-4" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Helados (6 unidades)</h3>
            <p className="text-gray-600">$11.990</p>
          </div>
          <div className="flex items-center ml-auto mr-5">
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-300">-</button>
            <span className="mx-3">1</span>
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-300">+</button>
          </div>
          <button className="bg-yellow-400 px-4 py-2 rounded-full text-gray-800 hover:bg-yellow-500 transition duration-300">Eliminar</button>
        </div>

        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <img src="/images/brownies.png" alt="Brownies" className="w-24 h-24 rounded-lg object-cover mr-4" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">Brownies (3 unidades)</h3>
            <p className="text-gray-600">$6.990</p>
          </div>
          <div className="flex items-center ml-auto mr-5">
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-300">-</button>
            <span className="mx-3">1</span>
            <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-300">+</button>
          </div>
          <button className="bg-yellow-400 px-4 py-2 rounded-full text-gray-800 hover:bg-yellow-500 transition duration-300">Eliminar</button>
        </div>
        {/* Agrega más productos si es necesario */}
      </div>

      <div className="w-1/3 bg-gray-100 p-5 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Resumen de compra</h2>
        <div className="flex justify-between mb-5 text-gray-800 font-medium">
          <p>Costo de tus productos</p>
          <p>$18.980</p>
        </div>
        <button className="bg-yellow-500 text-white font-bold px-5 py-3 rounded-full hover:bg-yellow-600 transition duration-300">
          Continuar con la compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
