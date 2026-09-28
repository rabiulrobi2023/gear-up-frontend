"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Role } from "@/interface/auth.interface";
import { OrderStatus } from "@/interface/order.interface";

import Link from "next/link";
import React from "react";

interface IOrderActionsProps {
  status: OrderStatus;
  role: Role;
  orderId: string;
  reviewDialog?: React.ReactNode;
  onConfirm?: (id: string) => void;
  isConfirmPending?: boolean;
  onPickup?: () => void;
  onReturn?: () => void;
}

const OrderActions = ({
  status,
  role,
  orderId,
  reviewDialog,
  onConfirm,
  isConfirmPending,
  onPickup,
  onReturn,
}: IOrderActionsProps) => {
  if (status === OrderStatus?.PLACED && role === Role.PROVIDER) {
    return (
      <Button
        disabled={isConfirmPending}
        type="button"
        size="sm"
        onClick={() => {
          onConfirm?.(orderId);
        }}
      >
        {isConfirmPending ? (
          <span className="flex gap-2">
            <Spinner/> Confirming..
          </span>
        ) : (
          "Confirm"
        )}
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
