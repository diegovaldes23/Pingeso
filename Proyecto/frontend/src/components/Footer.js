import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Información</h3>
        <ul>
          <li><a href="/about">Quiénes somos</a></li>
          <li><a href="/faq">Preguntas frecuentes</a></li>
          <li><a href="/shipping">Despachos</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Redes Sociales</h3>
        <div className="social-icons">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
            <FaPinterest />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Contáctanos</h3>
        <p><FaPhone /> +569 300 67653</p>
        <p><FaEnvelope /> ventas@cordovaconfites.cl</p>
      </div>
    </footer>
  );
}

export default Footer;
