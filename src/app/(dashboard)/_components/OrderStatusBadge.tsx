import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/interface/order.interface";
import { cn } from "@/lib/utils";

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <Badge
      className={cn(
        status === OrderStatus.PLACED && "bg-orange-100 text-orange-700",
        status === OrderStatus.CONFIRMED && "bg-blue-100 text-blue-700",
        status === OrderStatus.PAID && "bg-purple-100 text-purple-700",
        status === OrderStatus.PICKED && "bg-green-100 text-green-700",
        status === OrderStatus.RETURNED && "bg-gray-100 text-gray-700",
        status === OrderStatus.CANCELLED && "bg-red-100 text-red-700", "py-3 rounded-md"
      )}
    >
      {status}
    </Badge>
  );
};

export default OrderStatusBadge;
