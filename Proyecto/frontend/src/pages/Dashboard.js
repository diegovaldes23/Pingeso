import React from "react";
import Statistics from "./Statistics";
import { useGlobalContext } from "../utils/GlobalModelContext";

/**
 * Dashboard Component
 * 
 * Renderiza la vista principal del dashboard, mostrando estadísticas basadas en órdenes filtradas.
 * Utiliza el GlobalContext para acceder a la información de las órdenes filtradas.
 * 
 * @component
 * @returns {React.ReactElement} Componente Dashboard renderizado con estadísticas
 * 
 */
const Dashboard = () => {

    // Extracción de órdenes filtradas desde el contexto global
    const { filteredOrders } = useGlobalContext();

    return (
        <div className="mx-auto">
            {/* Se renderiza el componente de Estadísticas con las órdenes filtradas */}
            <Statistics filteredOrders={filteredOrders} />
        </div>
    );
};

export default Dashboard;
