import React from 'react';

function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <form className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Regístrate</h2>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input type="text" id="name" placeholder="Ingresa tu nombre" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" id="email" placeholder="Ingresa tu email" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input type="password" id="password" placeholder="Crea una contraseña" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />

        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
        <input type="password" id="confirm-password" placeholder="Confirma tu contraseña" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />

        <button type="submit" className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">Crear cuenta</button>

        <p className="text-center text-sm mt-4">¿Ya tienes cuenta? <a href="/login" className="text-yellow-500 hover:underline">Inicia sesión</a></p>
      </form>
    </div>
  );
}

export default RegisterPage;
