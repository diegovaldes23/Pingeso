import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Información</h3>
        <ul>
          <li>Quiénes somos</li>
          <li>Preguntas frecuentes</li>
          <li>Despachos</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Redes Sociales</h3>
        <div className="social-icons">
          <FaInstagram />
          <FaFacebook />
          <FaPinterest />
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
