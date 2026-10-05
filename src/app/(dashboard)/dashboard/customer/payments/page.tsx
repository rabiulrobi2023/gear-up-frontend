import PaymentTable from "@/app/(dashboard)/_components/customer/PaymentTable";
import { getAllPayments } from "@/app/(dashboard)/_service/getAllPayments";

const PaymentPage = async () => {
  const paymentData = await getAllPayments();
  const data = paymentData.data;
  return (
    <div className="" >
      <h1 className="text-xl font-bold mb-2">Payments</h1>
      <PaymentTable paymentData={data}  />
    </div>
  );
};

export default PaymentPage;
