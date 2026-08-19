"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { IOrderWithItem } from "@/interface/order.interface";
import { format } from "date-fns";
import { checkOut } from "../_actions/checkOut";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PaymentPage = ({ order }: { order: IOrderWithItem }) => {
    const router = useRouter()

  const [isPending, startTransition] = useTransition();
  const handleCheckOut = () => {
    startTransition(async () => {
      const result = await checkOut(order.id);
      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        router.push("/")
      }
    });
  };

  return (
    <>
      <CardContent className="p-0">
        <div>
          <dl className="grid grid-cols-[auto_auto_1fr]  text-right space-y-5">
            <dt className="text-left">Product Name</dt>
            <span>:</span>
            <dd className="font-bold">{order.item?.name}</dd>

            <dt className="text-left">Start Date</dt>
            <span>:</span>
            <dd>{format(order?.startDate, "dd-MMM-yyyy")}</dd>

            <dt className="text-left">Return Date</dt>
            <span>:</span>
            <dd>{format(order?.returnDate, "dd-MMM-yyyy")}</dd>

            <dt className="text-left">Total Days</dt>
            <span>:</span>
            <dd>
              {order?.totalDays} {order.totalDays > 1 ? "days" : "day"}
            </dd>

            <dt className="text-left">Quantity</dt>
            <span>:</span>
            <dd>{order?.quantity} Nos</dd>

            <dt className="text-left">Rate</dt>
            <span>:</span>
            <dd>{Number(order?.dailyRate).toFixed(2)} TK/day</dd>

            <dt className="font-semibold text-left ">Total Amount</dt>
            <span>:</span>
            <dd className="font-semibold">
              {Number(order?.totalAmount).toFixed(2)} TK
            </dd>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          onClick={handleCheckOut}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex gap-2">
              Processing...
              <Spinner />
            </span>
          ) : (
            "Pay Now"
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default PaymentPage;
