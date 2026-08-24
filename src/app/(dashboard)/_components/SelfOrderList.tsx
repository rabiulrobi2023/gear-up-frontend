"use server";

import { IAllOrderResponse } from "@/interface/order.interface";

import SelfOrderCard from "./SelfOrderCard";
import { Role } from "@/interface/auth.interface";
import { redirect } from "next/navigation";

const SelfOrderList = async ({
  orders,
  role,
}: {
  orders: IAllOrderResponse;
  role: Role;
}) => {
  if (!orders?.data?.data?.length) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No news found.
      </div>
    );
  }

  return (
    <div className="space-y-5 mt-5">
      {orders?.data?.data?.map((item) => (
        <SelfOrderCard key={item.id} order={item} role={role} />
      ))}
    </div>
  );
};

export default SelfOrderList;
