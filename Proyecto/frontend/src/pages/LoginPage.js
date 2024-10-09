import React from 'react';
import './LoginPage.css'; // Importa los estilos

function LoginPage() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Iniciar Sesión</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Ingresa tu email" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" />

        <button type="submit">Iniciar Sesión</button>

        <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
}

export default LoginPage;
