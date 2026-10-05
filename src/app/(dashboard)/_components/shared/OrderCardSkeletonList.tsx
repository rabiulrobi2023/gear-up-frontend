import OrderCardSkeleton from "./OrderCardSkeleton";

const OrderCardSkeletonList = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </>
  );
};

export default OrderCardSkeletonList;
