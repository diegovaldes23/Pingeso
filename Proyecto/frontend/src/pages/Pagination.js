const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Lógica para determinar las páginas que se mostrarán
    const getPageNumbers = () => {
      const pageNumbers = [];
  
      // Siempre mostrar la primera página
      pageNumbers.push(1);
  
      // Mostrar la página anterior si no está en la primera
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }
  
      // Mostrar la página actual
      pageNumbers.push(currentPage);
  
      // Mostrar la página siguiente si no está en la última
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }
  
      // Siempre mostrar la última página
      if (totalPages > 2) {
        pageNumbers.push(totalPages);
      }
  
      // Eliminar duplicados (si hay)
      return [...new Set(pageNumbers)];
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <div className="flex items-center justify-center space-x-2 my-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
  
        {/* Mostrar las páginas calculadas */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === pageNumber
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNumber}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Pagination;
  