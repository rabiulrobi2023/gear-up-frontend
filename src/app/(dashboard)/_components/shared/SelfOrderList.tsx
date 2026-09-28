"use client";

import { OrderStatus } from "@/interface/order.interface";
import { Role } from "@/interface/auth.interface";
import { useConfirmOrder } from "@/hooks/provider.hooks";
import { toast } from "sonner";
import FullDisplayLoader from "@/components/ui/spinner";
import OrderCard from "./OrderCard";
import { useGetMyAllOrders } from "@/hooks/share.hook";

const SelfOrderList = ({ role }: { role: Role }) => {
  const { data: orders, isLoading: orderFetchLoading } = useGetMyAllOrders();

  const { mutate: confirm, isPending, variables } = useConfirmOrder();

  if (orderFetchLoading) {
    return <FullDisplayLoader />;
  }

  if (!orders) {
    return <p>There is no any order</p>;
  }

  const handleOrderStatusChange = (status: OrderStatus) => {
    return (id: string) => {
      confirm(
        { id, body: { status } },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Order status changed successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to change order status");
          },
        },
      );
    };
  };

  const handleConfirmOrder = handleOrderStatusChange(OrderStatus.CONFIRMED);
  const handlePickupOrder = handleOrderStatusChange(OrderStatus.PICKED);
  const handleReturnOrder = handleOrderStatusChange(OrderStatus.RETURNED)


  return (
    <div className="space-y-5 mt-5">
      {orders?.data?.data?.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          role={role}
          onConfirm={handleConfirmOrder}
          isPending={isPending && variables?.id === order.id} onPickup={handlePickupOrder} onReturn={handleReturnOrder}
        />
      ))}
    </div>
  );
};

export default SelfOrderList;
