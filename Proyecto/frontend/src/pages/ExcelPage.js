import React, { useState } from "react"; 
import * as XLSX from "xlsx";
import moment from "moment"; // Para manejar la fecha y hora
import Swal from "sweetalert2"; // Para mostrar alertas (opcional)
import { useGlobalContext } from '../utils/GlobalModelContext';

const ExcelPage = () => {
  // Obtener las órdenes desde el estado global (asumiendo Redux)
  const { orders } = useGlobalContext(); // Asegúrate de ajustar esto a la estructura de tu store

  // Función para exportar los datos a Excel
  const exportToExcel = () => {
    if (orders.length === 0) {
      Swal.fire({
        title: "No hay datos",
        text: "No hay órdenes para exportar.",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    // Obtener la fecha y hora actual para usarla en el nombre del archivo
    const date = moment().format("YYYY-MM-DD_HH-mm-ss"); // Ej: 2024-11-29_15-30-45

    // Crear un libro de trabajo (workbook) con los datos
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(wb, ws, "Órdenes");

    // Generar el nombre del archivo
    const fileName = `Órdenes_${date}.xlsx`;

    // Exportar el archivo
    XLSX.writeFile(wb, fileName);

    Swal.fire({
      title: "Exportación exitosa",
      text: `Las órdenes se han exportado correctamente como ${fileName}`,
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
        Exportar órdenes
      </h1>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={exportToExcel}
          className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
        >
          Exportar a Excel
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-600">Aquí puedes exportar los datos de las órdenes a un archivo Excel.</p>
      </div>
    </div>
  );
};

export default ExcelPage;
