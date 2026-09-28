import PaymentPage from "@/app/(dashboard)/_components/customer/PaymentCard";
import { getSingleOrder } from "@/app/(dashboard)/_service/getSingleOrder";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOrder } from "@/interface/order.interface";


const PaymentInitiatePage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const orderId = (await params).orderId;

  const order = await getSingleOrder(orderId);

  return (
    <Card className="w-[400px] flex mx-auto ring-0 shadow-none ">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Payment</CardTitle>
        <CardDescription className="pb-6">
          Make payment to confirm your rents
        </CardDescription>
        <PaymentPage order={order.data as IOrder} />
      </CardHeader>
    </Card>
  );
};

export default PaymentInitiatePage;
