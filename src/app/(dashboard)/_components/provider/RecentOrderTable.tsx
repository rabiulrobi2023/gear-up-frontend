"use client";

import { DataTable } from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { useGetMyAllOrders } from "@/hooks/share.hook";

import { IOrder } from "@/interface/order.interface";
import { IDataTableColumn } from "@/interface/table.interface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const RecentOrderTable = () => {
  const { data, isLoading } = useGetMyAllOrders();

  const orders: IOrder[] = data?.data?.data || [];
  const showOrder = orders.slice(0, 3);

  const pendingOrderTableColumn: IDataTableColumn<IOrder>[] = [
    {
      key: "itemImage",
      header: "Item Photo",
      accessor: (order) =>
        order.item.image ? (
          <Image
            unoptimized
            src={order.item.image}
            alt={order.item.name}
            width={48}
            height={48}
            className="h-8"
          />
        ) : (
          "-"
        ),
      className: "text-left p-0",
    },
    {
      key: "itemName",
      header: "Item Name",
      accessor: (order) => order.item.name,
      className: "",
    },
    {
      key: "customerName",
      header: "Customer Name",
      accessor: (order) => order.customer.name,
    },
    {
      key: "contactNumber",
      header: "Mobile No",
      accessor: (order) => order.customer.phone ?? "-",
      className: "text-center",
    },
    {
      key: "quantity",
      header: "Quantity",
      className: "text-center",
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      className: "text-right",
    },
  ];

  const tableBodyClassName = "border-0 rounded-none";
  const headerClassName = "hover:bg-transparent bg-transparent ";
  const rowClassName = "border-b-0 hover:bg-transparent";
  return (
    <div className="md:w-2/3 overflow-hidden">
      <DataTable
        columns={pendingOrderTableColumn}
        data={showOrder}
        rowKey="id"
        isLoading={isLoading}
        headerClassName={headerClassName}
        tableBodyClassName={tableBodyClassName}
        rowClassName={rowClassName}
        emptyMessage="There is no any pending orders"
      />
      {orders?.length > 1 ? (
        <Link href="/dashboard/provider/orders">
          <Button
            className="text-primary hover:bg-transparent hover:underline hover:cursor-pointer hover:text-primary p-0"
            variant="ghost"
          >
            See all..
          </Button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecentOrderTable;
