const handleViewDetails = (orderId, orders, isModalOpen, selectedOrder) => {
    const order = orders.find((o) => o.id_order === orderId);
    isModalOpen(true);
    selectedOrder(order);
};

export default handleViewDetails;