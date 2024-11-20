const handleViewDetails = (orderId, orders, isModalOpen, selectedOrder) => {
    const order = orders.find((o) => o.id === orderId);
    isModalOpen(true);
    selectedOrder(order);
};

export default handleViewDetails;