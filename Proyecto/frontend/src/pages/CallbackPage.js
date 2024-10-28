import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Si estás usando React Router
import React from 'react';

function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Capturamos el código de autorización de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get('code');

    if (authorizationCode) {
      console.log('Authorization code:', authorizationCode);
      
      // Aquí podrías enviar el authorizationCode a tu backend
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
        // Guarda el token en localStorage o navega a una página diferente
        navigate('/success');  // Redirigir a la página de éxito o algún dashboard
      })
      .catch(error => {
        console.error('Error getting access token:', error);
      });
    } else {
      console.error('Authorization code not found');
    }
  }, [navigate]);

  return <div>Autenticando...</div>;
}

export default CallbackPage;
