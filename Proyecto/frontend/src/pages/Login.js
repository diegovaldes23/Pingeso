import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cordovaFoto from "../icons/cordovafoto.png"; // Imagen para la columna izquierda
import logoCordova from "../icons/logocordova.png"; // Logo para la esquina superior izquierda

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://165.22.189.49:8080";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role_u", data.role); // Rol del usuario
      navigate("/orders");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Columna izquierda */}
      <div className="w-1/2">
        <img
          src={cordovaFoto}
          alt="Córdova Admin"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col w-1/2 bg-gray-100 relative justify-center">
        {/* Nombre de la empresa */}
        <div className="absolute top-4 left-4 flex items-center">
          <img
            src={logoCordova}
            alt="Confites Córdova Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3 text-xl font-semibold text-gray-800">
            Confites Córdova Admin
          </span>
        </div>

        {/* Contenido del formulario */}
        <div className="flex justify-center items-center">
          <div className="w-80 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Inicia sesión</h2>

            {/* Mensaje de error profesional */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-.01-10a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Nombre de usuario
                </label>
                <input
                  type="text" // Cambiado de email a text
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
