import React from 'react';
import { FaInstagram, FaFacebook, FaPinterest, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-pink-pastel text-white py-10 px-5 flex justify-around items-start flex-wrap">
      <div className="flex-1 min-w-[200px] m-3">
        <h3 className="mb-4 text-lg">Información</h3>
        <ul className="list-none p-0 m-0 space-y-2">
          <li><a href="/about" className="text-white text-sm hover:text-gray-800 transition-colors">Quiénes somos</a></li>
          <li><a href="/faq" className="text-white text-sm hover:text-gray-800 transition-colors">Preguntas frecuentes</a></li>
          <li><a href="/shipping" className="text-white text-sm hover:text-gray-800 transition-colors">Despachos</a></li>
        </ul>
      </div>
      <div className="flex-1 min-w-[200px] m-3">
        <h3 className="mb-4 text-lg">Redes Sociales</h3>
        <div className="flex gap-4 mt-2">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-800 transition-colors">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-800 transition-colors">
            <FaFacebook />
          </a>
          <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-800 transition-colors">
            <FaPinterest />
          </a>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] m-3">
        <h3 className="mb-4 text-lg">Contáctanos</h3>
        <p className="flex items-center gap-2 text-sm"><FaPhone /> +569 300 67653</p>
        <p className="flex items-center gap-2 text-sm"><FaEnvelope /> ventas@cordovaconfites.cl</p>
      </div>
    </footer>
  );
}

export default Footer;
