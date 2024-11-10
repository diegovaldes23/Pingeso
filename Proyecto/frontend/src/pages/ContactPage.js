// src/pages/ContactPage.js
import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contáctanos</h1>
      <p>¿Tienes alguna pregunta o comentario? Envíanos un mensaje.</p>
      <form className="contact-form">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Mensaje</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
}

export default ContactPage;
