import { useState, useMemo } from "react";

export const useOrderStatus = (orders, status) => {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useMemo(() => {
    if (orders?.length) {
      const filteredOrders = orders.filter((order) => {
        switch (status) {
          case "delivery":
            return order.isPaid && !order.isDelivered;
          case "pay":
            return !order.isPaid;
          default:
            return orders;
        }
      });
      setFilteredOrders(filteredOrders);
    }
  }, [orders, status]);

  return filteredOrders;
};
