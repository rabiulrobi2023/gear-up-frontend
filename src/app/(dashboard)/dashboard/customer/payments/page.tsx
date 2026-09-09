import PaymentTable from "@/app/(dashboard)/_components/PaymentTable";
import { getAllPayments } from "@/app/(dashboard)/_service/getAllPayments";

const PaymentPage = async () => {
  const paymentData = await getAllPayments();
  const data = paymentData.data;
  return <PaymentTable paymentData={data} />;
};

export default PaymentPage;
