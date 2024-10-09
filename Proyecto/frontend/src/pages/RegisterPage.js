import React from 'react';
import './RegisterPage.css'; // Importa los estilos

function RegisterPage() {
  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Regístrate</h2>

        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" placeholder="Ingresa tu nombre" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Ingresa tu email" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Crea una contraseña" />

        <label htmlFor="confirm-password">Confirmar Contraseña</label>
        <input type="password" id="confirm-password" placeholder="Confirma tu contraseña" />

        <button type="submit">Crear cuenta</button>

        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}

export default RegisterPage;
