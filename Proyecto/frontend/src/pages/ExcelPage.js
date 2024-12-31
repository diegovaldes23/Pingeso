import React, { useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios"; // Para enviar el archivo al backend
import { useGlobalContext } from "../utils/GlobalModelContext";

const ExcelPage = () => {
  const { orders, backend } = useGlobalContext();
  const [selectedFile, setSelectedFile] = useState(null); // Estado para manejar el archivo seleccionado
  const [isLoading, setIsLoading] = useState(false);

  // Exportar órdenes a Excel
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

    const date = moment().format("YYYY-MM-DD_HH-mm-ss");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(wb, ws, "Órdenes");
    const fileName = `Órdenes_${date}.xlsx`;

    XLSX.writeFile(wb, fileName);
    Swal.fire({
      title: "Exportación exitosa",
      text: `Las órdenes se han exportado correctamente como ${fileName}`,
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  };

  // Manejar la selección del archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Enviar el archivo al backend
  const importOrders = async () => {
    if (!selectedFile) {
      Swal.fire({
        title: "Archivo no seleccionado",
        text: "Por favor, selecciona un archivo Excel para importar.",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken"); // Token de autenticación
      const response = await axios.post(
        `${backend}/admin/excel/upload`, // Cambia la URL según tu backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Si usas autenticación
          },
        }
      );

      Swal.fire({
        title: "Importación exitosa",
        text: response.data.message || "Órdenes importadas correctamente.",
        icon: "success",
        confirmButtonText: "Cerrar",
      });

      // Reiniciar el archivo seleccionado
      setSelectedFile(null);
    } catch (error) {
      console.error("Error al importar las órdenes:", error);
      Swal.fire({
        title: "Error al importar",
        text: "Hubo un problema al importar las órdenes. Por favor, verifica el archivo y vuelve a intentarlo.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {isLoading ? (
      <div className="flex flex-col items-center justify-center">
        {/* Pantalla de carga */}
        <div className="loader w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-semibold">Cargando órdenes...</p>
      </div>
    ) : (
      <div className="max-w-4xl w-full p-10 bg-white shadow-lg rounded-lg h-[50vh] flex flex-col items-center justify-center">
        {/* Contenido principal */}
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">
          Gestión de órdenes
        </h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={exportToExcel}
            className="bg-indigo-700 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition duration-300 mr-4"
          >
            Exportar
          </button>

          <label
            htmlFor="import-file"
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Seleccionar archivo
          </label>
          <input
            type="file"
            id="import-file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={importOrders}
            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
          >
            Importar
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Selecciona un archivo Excel para importar órdenes o exporta las
            órdenes actuales a un archivo Excel.
          </p>
        </div>
      </div>
    )}
    </div>
  );
};

export default ExcelPage;
