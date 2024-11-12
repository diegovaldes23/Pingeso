import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full bg-pink-300 font-sans py-4 shadow-md">
      <div className="flex justify-between items-center px-8 max-w-4xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo de tu tienda" className="h-12" />
          </Link>
          <Link to="/" className="text-lg font-bold text-gray-800 hover:text-orange-500">Menú</Link>
          <nav className="flex space-x-6">
            <Link to="/order" className="text-gray-800 hover:text-orange-500 text-sm">Pedir</Link>
            <Link to="/contact" className="text-gray-800 hover:text-orange-500 text-sm">Contactos</Link>
          </nav>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="¿Qué deseas comer?"
            className="px-4 py-2 w-80 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/profile" className="flex flex-col items-center text-gray-800 hover:text-orange-500">
            <img src="/images/usuario.png" alt="Usuario" className="h-6 mb-1" />
            <span className="text-xs">Perfil</span>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-orange-500 text-sm">
              Ingresar
            </button>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-gray-800 hover:text-orange-500">
            <img src="/images/carrito.png" alt="Carrito" className="h-6 mb-1" />
            <span className="text-xs">Carrito</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
