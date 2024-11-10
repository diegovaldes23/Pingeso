// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="header-left">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo de tu tienda" className="logo" />
          </Link>
          <Link to="/" className="menu-link">Menú</Link> {/* Enlace al menú o página de inicio */}
          <nav className="nav-links">
            <Link to="/order">Pedir</Link>
            <Link to="/contact">Contactos</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="¿Qué deseas comer?" className="search-input" />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <Link to="/profile" className="icon-link">
            <img src="/images/usuario.png" alt="Usuario" className="user-icon" />
            <span>Perfil</span>
          </Link>
          <Link to="/login">
            <button className="login-button">Ingresar</button>
          </Link>
          <Link to="/cart" className="icon-link">
            <img src="/images/carrito.png" alt="Carrito" className="cart-icon" />
            <span>Carrito</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
