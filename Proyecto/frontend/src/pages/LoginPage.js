import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Si usas React Router
import React from 'react';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extraer el code de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get('code');

    if (authorizationCode) {
      // Enviar el código al backend para intercambiarlo por el access_token
      fetch('http://localhost:3001/getAccessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authorizationCode }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access token:', data.access_token);
          // Haz lo que necesites con el token
          navigate('/success');
        })
        .catch(error => {
          console.error('Error getting access token:', error);
        });
    }
  }, []);

  return <div>Autenticando...</div>;
}

export default Callback;
