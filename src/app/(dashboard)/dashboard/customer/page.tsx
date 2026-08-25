import { IAllOrderResponse } from "@/interface/order.interface";
import { getSelfOrders } from "../../_service/getSelfOrders";
import SelfOrderList from "../../_components/SelfOrderList";
import { getMe } from "@/app/(auth)/_service/getMe";
import { Role } from "@/interface/auth.interface";

const page = async () => {
  const selfOrders: IAllOrderResponse = await getSelfOrders();
  const user = await getMe();
  return (
    <div>
      <h1 className="text-xl font-bold">Orders</h1>
      <SelfOrderList orders={selfOrders} role={user?.data?.role as Role} />
    </div>
  );
};

export default page;
