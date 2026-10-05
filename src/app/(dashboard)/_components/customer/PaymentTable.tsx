"use client";

import { DataTable } from "@/components/shared/table/DataTable";
import { IPayment, IPaymentResponse } from "@/interface/payment.interface";
import { IDataTableColumn } from "@/interface/table.interface";

type nestedCustomerPaymentKey =
  | "gearName"
  | " dailyRate"
  | "quantity"
  | "dailyRate"
  | "totalDays";

const columns: IDataTableColumn<IPayment, nestedCustomerPaymentKey>[] = [
  {
    key: "gearName",
    header: "Gear Name",
    accessor: (value) => value.order.item.name,
  },

  {
    key: "method",
    header: "Method",
    className: "text-center",
  },

  {
    key: "dailyRate",
    header: "Daily Rate",
    accessor: (value) => value.order.item.dailyRate,
    className: "text-right",
  },

  {
    key: "quantity",
    header: "Quantity",
    accessor: (value) => value.order.quantity,
    className: "text-right",
  },

  {
    key: "totalDays",
    header: "Total Days",
    accessor: (value) => value.order.totalDays,
    className: "text-right",
  },

  {
    key: "amount",
    header: "Total Amount",
    className: "text-right",
  },

  {
    key: "status",
    header: "Status",
    className: "text-right",
  },
];
const PaymentTable = ({ paymentData }: { paymentData: IPayment[] }) => {
  // const tableData = paymentData.map((data) => ({
  //   id: data.id,
  //   gearName: data.order.item.name,
  //   method: data.method,
  //   dailyRate: data.order.item.dailyRate,
  //   quantity: data.order.quantity,
  //   totalDays: data.order.totalDays,
  //   amount: data.amount,
  //   status: data.status,
  // }));

  return (
    <DataTable
      columns={columns}
      data={paymentData}
      emptyMessage="There is no any payment"
      rowKey={"id"}
    />
  );
};

export default PaymentTable;
