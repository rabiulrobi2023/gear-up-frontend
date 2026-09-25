import { Button } from "@/components/ui/button";
import { Role } from "@/interface/auth.interface";
import { OrderStatus } from "@/interface/order.interface";

import Link from "next/link";
import React from "react";

interface IOrderActionsProps {
  status: OrderStatus;
  role: Role;
  orderId: string;
  reviewDialog?: React.ReactNode;
  onConfirm?: () => void;
  onPickup?: () => void;
  onReturn?: () => void;
}

const OrderActions = ({
  status,
  role,
  orderId,
  reviewDialog,
  onConfirm,
  onPickup,
  onReturn,
}: IOrderActionsProps) => {
  if (status === OrderStatus.PLACED && role === Role.PROVIDER) {
    return (
      <Button size="sm" onClick={onConfirm}>
        Confirm
      </Button>
    );
  }

  if (status === OrderStatus.CONFIRMED && role === Role.CUSTOMER) {
    return (
      <Button size="sm">
        <Link href={`/dashboard/customer/orders/${orderId}/pay`}>Pay Now</Link>
      </Button>
    );
  }
  if (status === OrderStatus.PAID && role === Role.PROVIDER) {
    return (
      <Button size="sm" onClick={onPickup}>
        Mark Picked Up
      </Button>
    );
  }
  if (status === OrderStatus.PICKED && role === Role.PROVIDER) {
    return (
      <Button size="sm" onClick={onReturn}>
        Mark as Return
      </Button>
    );
  }

  if (status === OrderStatus.RETURNED && role === Role.CUSTOMER) {
    return reviewDialog;
  }
  return null;
};

export default OrderActions;
