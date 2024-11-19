import React from 'react';

const FiltersAndSorting = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Todos los Estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En proceso">En proceso</option>
        <option value="Completada">Completada</option>
        <option value="Cancelada">Cancelada</option>
      </select>
    </div>
  );
};

export default FiltersAndSorting;
