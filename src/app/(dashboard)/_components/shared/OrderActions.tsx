"use client";

import ActionButton from "@/components/shared/ActionButton";
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
  isPending?: boolean;
  onPickup?: (id: string) => void;
  onReturn?: (id: string) => void;
}

const OrderActions = ({
  status,
  role,
  orderId,
  reviewDialog,
  onConfirm,
  isPending,
  onPickup,
  onReturn,
}: IOrderActionsProps) => {
  if (status === OrderStatus?.PLACED && role === Role.PROVIDER) {
    return (
      <ActionButton
        loading={isPending}
        loadingText="Confirming.."
        onClick={() => onConfirm?.(orderId)}
      >
        Confirm
      </ActionButton>
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
      <ActionButton
        loading={isPending}
        loadingText="Picking..."
        onClick={() => onPickup?.(orderId)}
      >
        Mark Picked Up
      </ActionButton>
    );
  }
  if (status === OrderStatus.PICKED && role === Role.PROVIDER) {
    return (
      <ActionButton
        loading={isPending}
        loadingText="Returning..."
        onClick={() => onReturn?.(orderId)}
      >
        Mark as Return
      </ActionButton>
    );
  }

  if (status === OrderStatus.RETURNED && role === Role.CUSTOMER) {
    return reviewDialog;
  }
  return null;
};

export default OrderActions;
