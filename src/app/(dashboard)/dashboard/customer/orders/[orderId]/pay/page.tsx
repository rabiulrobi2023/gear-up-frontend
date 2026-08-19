import PaymentPage from "@/app/(dashboard)/_components/PaymentPage";
import { getSingleOrder } from "@/app/(dashboard)/_service/getSingleOrder";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOrderWithItem } from "@/interface/order.interface";

const PaymentInitiatePage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const orderId = (await params).orderId;
  const order = await getSingleOrder(orderId);

  return (
    <Card className="w-[400px] flex mx-auto border-0 border-none border-transparent shadow-none rounded-sm ">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold">Payment</CardTitle>
        <CardDescription className="pb-6">
          Make payment to confirm your rents
        </CardDescription>
        <PaymentPage order={order.data as IOrderWithItem} />
      </CardHeader>
    </Card>
  );
};

export default PaymentInitiatePage;
