"use client";

import { ActionDialog } from "@/components/shared/ActionDialog";
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
      <ActionDialog
        triggerBtn={<Button>Confirm</Button>}
        onAction={() => onConfirm?.(orderId)}
        loading={isPending}
        loadingText="Confirming..."
      />
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
      <ActionDialog
        onAction={() => onPickup?.(orderId)}
        triggerBtn={<Button> Mark Picked Up</Button>}
        loading={isPending}
      />
    );
  }
  if (status === OrderStatus.PICKED && role === Role.PROVIDER) {
    return (
      <ActionDialog
        onAction={() => onReturn?.(orderId)}
        triggerBtn={<Button> Mark as Return</Button>}
      />
    );
  }

  if (status === OrderStatus.RETURNED && role === Role.CUSTOMER) {
    return reviewDialog;
  }
  return null;
};

export default OrderActions;
