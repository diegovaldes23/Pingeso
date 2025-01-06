import React from 'react';

const ContactPage = () => {
  // Datos de los creadores
  const creators = [
    {
      name: 'Diego Valdés Fernández',
      email: 'diego.valdes.f@usach.cl',
      phone: '+56 9 87295168',
      github: 'https://github.com/diegovaldes23',
      linkedin: 'https://www.linkedin.com/in/diego-valdes-fernandez-b9802a228',
    },
    {
      name: 'Valentina Campos Olguín',
      email: 'valentina.campos.o@usach.cl',
      phone: '+56 9 5460 6235',
      github: 'https://github.com/valenpy22',
      linkedin: 'https://www.linkedin.com/in/valentina-campos-olguín-943090252',
    },
    {
      name: 'Branco García',
      email: 'branco.garcia@usach.cl',
      phone: '+56 9 7741 8867',
      github: 'https://github.com/BrancoGarciaS',
      linkedin: 'https://www.linkedin.com/in/branco-garcía-05a103330',
    },
    {
      name: 'Bryan Salgado',
      email: 'bryan.salgado@usach.cl',
      phone: '+56 9 9842 5628',
      github: 'https://github.com/BryanSalgado',
      linkedin: 'https://www.linkedin.com/in/bryan-salgado-labbe-a9440a344',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 flex flex-col items-center py-20">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8">
        Nuestro equipo
      </h1>
      <div className="w-11/12 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="w-20 h-20 bg-indigo-200 text-indigo-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {creator.name
                .split(' ')
                .map((word) => word[0])
                .join('')}
            </div>
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">
              {creator.name}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Correo:</strong>{' '}
              <a
                href={`mailto:${creator.email}`}
                className="text-indigo-500 hover:underline"
              >
                {creator.email}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Teléfono:</strong>{' '}
              <a
                href={`tel:${creator.phone}`}
                className="text-indigo-500 hover:underline"
              >
                {creator.phone}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <strong>GitHub:</strong>{' '}
              <a
                href={creator.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                GitHub
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <strong>LinkedIn:</strong>{' '}
              <a
                href={creator.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
