import React, { useState } from "react"; 
import * as XLSX from "xlsx";
import moment from "moment"; // Para manejar la fecha y hora
import Swal from "sweetalert2"; // Para mostrar alertas (opcional)
import { useGlobalContext } from '../utils/GlobalModelContext';

/**
 * ExcelPage Component
 * 
 * Provee funcionalidad para exportar órdenes a un archivo Excel.
 * Usa contexto global para acceder a las órdenes y SweetAlert para las notificaciones de usuarios.
 * 
 * @component
 * @returns {React.ReactElement} ExcelPage renderizado con funcionalidad de exportación
 */

const ExcelPage = () => {
  // Obtención de órdenes desde el estado global
  const { orders } = useGlobalContext(); // Asegúrate de ajustar esto a la estructura de tu store

  /**
   * Exporta las órdenes a un archivo Excel
   * 
   * Pasos:
   * 1. Se verifica si hay órdenes que exportar
   * 2. Se genera un archivo con un timestamp
   * 3. Se crea un workbook y un worksheet
   * 4. Se escribe en el archivo
   * 5. Se muestra una notificación de éxito
   * 
   * @throws {Error} Se muestra una alerta si es que no hay órdenes disponibles 
   */
  const exportToExcel = () => {

    // Se valida si es que hay órdenes que exportar
    if (orders.length === 0) {
        Swal.fire({
            title: "No hay datos",
            text: "No hay órdenes para exportar.",
            icon: "warning",
            confirmButtonText: "Cerrar",
        });

        return;
    }

    // Se genera el nombre del archivo con un timestamp para la exportación Excel
    const date = moment().format("YYYY-MM-DD_HH-mm-ss"); 

    // Crear un workbook y un worksheet con los datos
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(wb, ws, "Órdenes");

    // Definir el nombre de archivo con el timestamp actual
    const fileName = `Órdenes_${date}.xlsx`;

    // Exportar el archivo y mostrar una notificación de éxito
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
        {/* Título de página */}
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">
            Exportar órdenes
        </h1>
      
        {/* Botón de exportar */}
        <div className="flex justify-center mb-6">
            <button
            onClick={exportToExcel}
            className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
            >
            Exportar a Excel
            </button>
        </div>

        {/* Texto descriptivo */}
        <div className="text-center mt-6">
            <p className="text-gray-600">Aquí puedes exportar los datos de las órdenes a un archivo Excel.</p>
        </div>
    </div>
    );
};

export default ExcelPage;
