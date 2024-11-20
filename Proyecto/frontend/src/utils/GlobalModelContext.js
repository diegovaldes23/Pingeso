import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ModalContext = createContext();

// Crear un proveedor para el contexto
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, selectedOrder, setSelectedOrder }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto de forma más sencilla
export const useModalContext = () => {
  return useContext(ModalContext);
};
