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

  const {
    mutate: confirm,
    isPending: isConfirmPending,
    variables,
  } = useConfirmOrder();

  if (orderFetchLoading) {
    return <FullDisplayLoader />;
  }

  if (!orders) {
    return <p>There is no any order</p>;
  }

  const handleConfirmOrder = (id: string) => {
    confirm(
      { id, body: { status: OrderStatus.CONFIRMED } },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Order confirmed successfully");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to confirm order");
        },
      },
    );
  };

  return (
    <div className="space-y-5 mt-5">
      {orders?.data?.data?.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          role={role}
          onConfirm={handleConfirmOrder}
          isConfirmPending={isConfirmPending && variables?.id === order.id}
        />
      ))}
    </div>
  );
};

export default SelfOrderList;
