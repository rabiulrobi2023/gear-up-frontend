import { Button } from "@/components/ui/button";
import { Role } from "@/interface/auth.interface";
import { OrderStatus } from "@/interface/order.interface";
import { IRole } from "@/interface/user.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IOrderActionsProps {
  status: OrderStatus;
  role: Role;
  orderId:string;
  onConfirm?: () => void;
  onPay?: () => void;
  onPickup?: () => void;
  onReturn?: () => void;
  onReview?: () => void;
}

const OrderActions = ({
  status,
  role,
  orderId,
  onConfirm,
  onPay,
  onPickup,
  onReturn,
  onReview,
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
    return (
      <Button size="sm" onClick={onReview}>
        Leave Review
      </Button>
    );
  }
  return null;
};

export default OrderActions;
