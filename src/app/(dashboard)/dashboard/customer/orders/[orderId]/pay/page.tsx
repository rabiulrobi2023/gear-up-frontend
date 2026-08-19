const PaymentInitiatePage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const id = (await params).orderId;
  return <div>Order Id: {id}</div>;
};

export default PaymentInitiatePage;
