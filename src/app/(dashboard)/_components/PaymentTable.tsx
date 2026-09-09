"use client";
import TableStructure, {
  ITableColumn,
} from "@/components/shared/table/TableStructure";
import { IPayment } from "@/interface/payment.interface";

const columns: ITableColumn[] = [
  {
    header: "Gear Name",
    key: "gearName",
  },

  {
    header: "Method",
    key: "method",
    className: "text-center",
  },

  {
    header: "Daily Rate",
    key: "dailyRate",
    className: "text-right",
  },

  {
    header: "Quantity",
    key: "quantity",
    className: "text-right",
  },

  {
    header: "Total Days",
    key: "totalDays",
    className: "text-right",
  },

  {
    header: "Total Amount",
    key: "amount",
    className: "text-right",
  },

  {
    header: "Status",
    key: "status",
    className: "text-right",
  },
];
const PaymentTable = ({ paymentData }: { paymentData: IPayment[] }) => {
  const tableData = paymentData.map((data) => ({
    gearName: data.order.item.name,
    method: data.method,
    dailyRate: data.order.item.dailyRate,
    quantity: data.order.quantity,
    totalDays: data.order.totalDays,
    amount: data.amount,
    status: data.status,
  }));

  return (
    <TableStructure
      columns={columns}
      data={tableData}
      emptyMessage="There is no any payment"
    />
  );
};

export default PaymentTable;
