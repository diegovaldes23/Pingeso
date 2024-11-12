import React from 'react';

function ContactPage() {
  return (
    <div className="p-5 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Contáctanos</h1>
      <p className="text-gray-600 mb-6">¿Tienes alguna pregunta o comentario? Envíanos un mensaje.</p>
      <form className="flex flex-col gap-4">
        <label htmlFor="name" className="font-semibold text-gray-800">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="p-2 border border-gray-300 rounded-md text-lg"
        />

        <label htmlFor="email" className="font-semibold text-gray-800">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="p-2 border border-gray-300 rounded-md text-lg"
        />

        <label htmlFor="message" className="font-semibold text-gray-800">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className="p-2 border border-gray-300 rounded-md text-lg resize-none"
        ></textarea>

        <button
          type="submit"
          className="bg-gray-800 text-white py-2 px-4 rounded-full mt-4 hover:bg-red-600 transition-colors duration-300"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
