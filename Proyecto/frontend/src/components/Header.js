import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Confites Córdoba" className="logo" /> {/* Usando la ruta absoluta desde public */}
        <button className="menu-btn">☰ Menú</button>
      </div>
      <div className="header-center">
        <input type="text" placeholder="¿Qué deseas comer?" className="search-input" />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="header-right">
        <Link to="/">
          <span className="welcome-message">¡Inicio!</span> {/* Enlace para ir a la página principal */}
        </Link>
        <Link to="/login">
          <img src="/images/usuario.png" alt="Usuario" className="user-icon" /> {/* Usando la ruta desde public */}
        </Link>
        <Link to="/cart">
          <img src="/images/carrito.png" alt="Carrito" className="cart-icon" /> {/* Usando la ruta desde public */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
