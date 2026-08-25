"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IOrderWithItem } from "@/interface/order.interface";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";

import { Role } from "@/interface/auth.interface";
import OrderActions from "./OrderActions";
import { ReviewDialog } from "./ReviewDialog";

const SelfOrderCard = ({
  order,
  role,
  onConfirm,
  onPay,
  onPickup,
  onReturn,
  onReview,
}: {
  order: IOrderWithItem;
  role: Role;
  onConfirm?: () => void;
  onPay?: () => void;
  onPickup?: () => void;
  onReturn?: () => void;
  onReview?: () => void;
}) => {
  const {
    id: orderId,
    dailyRate,
    quantity,
    startDate,
    returnDate,
    status,
    totalDays,
    totalAmount,
    item,
  } = order;

  const { id: itemId, name: gearName, brand, image, provider, category } = item;

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Image */}
          <div className="shrink-0">
            <Image
              src={image}
              alt={gearName}
              width={72}
              height={72}
              unoptimized
              className="h-[72px] w-[72px] rounded-lg object-cover"
            />
          </div>

          {/* Main Information */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold">{gearName}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {brand} · {category.name}
                </p>
              </div>

              {/* Mobile status */}
              <span className="sm:hidden">
                {" "}
                <OrderStatusBadge status={status} />
              </span>
            </div>

            <p className="mt-2 text-sm">
              <span className="text-muted-foreground">Supplier:</span>{" "}
              <span className="font-medium">{provider.name}</span>
            </p>

            {/* Rental Details */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Rental:</span>{" "}
                <span className="font-medium">
                  {format(new Date(startDate), "dd MMM yyyy")}
                  {" → "}
                  {format(new Date(returnDate), "dd MMM yyyy")}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Days:</span>{" "}
                <span className="font-medium">{totalDays}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Qty:</span>{" "}
                <span className="font-medium">{quantity}</span>
              </div>
            </div>
          </div>

          {/* Price + Status */}
          <div className="flex items-center justify-between border-t pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 gap-2">
            {/* Desktop status */}
            <span className="hidden sm:flex">
              {" "}
              <OrderStatusBadge status={status} />
            </span>

            <div className="text-right">
              <p className="text-lg font-bold">৳{totalAmount}</p>

              <p className="text-xs text-muted-foreground">৳{dailyRate}/day</p>
            </div>
            <div className=" pt-3  sm:pl-4 sm:pt-0">
              <OrderActions
                status={status}
                role={role}
                orderId={orderId}
                reviewDialog={
                  <ReviewDialog itemId={itemId} orderId={orderId} />
                }
                onConfirm={onConfirm}
                onPickup={onPickup}
                onReturn={onReturn}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfOrderCard;
