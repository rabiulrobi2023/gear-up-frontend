"use client";

import { ActionDialog } from "@/components/shared/ActionDialog";
import { DataTable } from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteGear, useGetAllGears } from "@/hooks/provider.hooks";
import { IGear, INestedGearField } from "@/interface/gear.interface";
import { IDataTableColumn } from "@/interface/table.interface";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import {
  Delete,
  DeleteIcon,
  Edit,
  LucideDelete,
  Plus,
  Trash,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const providerGearTableColumn: IDataTableColumn<IGear, INestedGearField>[] = [
  {
    key: "image",
    header: "Photo",
    accessor: (gear) =>
      gear.image ? (
        <Image
          unoptimized
          src={gear.image}
          alt={gear.name}
          height={48}
          width={48}
          className="rounded-full h-10 w-10"
        />
      ) : (
        "-"
      ),
    className: "text-left",
  },

  {
    key: "name",
    header: "Product Name ",
  },
  {
    key: "categoryName",
    header: "Category",
    accessor: (value) => value.category.name,
  },
  {
    key: "brand",
    header: "Brand",
  },
  {
    key: "dailyRate",
    header: "Daily Rate",
    className: "text-right",
  },

  {
    key: "stock",
    header: "Stock",
    className: "text-right",
  },
];

const ProviderGearsTable = () => {
  const { data, isLoading } = useGetAllGears();
  const gears = data?.data.data;

  const { mutate: deleteGear, isPending } = useDeleteGear();
  const queryClient = useQueryClient();

  const handleDelete = (id: string) => {
    deleteGear(id, {
      onSuccess: (res) => {
        toast.success(res.message || "Gear deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["providersGears"] });
      },
      onError: (error) => {
        toast.error(error?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="space-y-3">
      <DataTable
        columns={providerGearTableColumn}
        data={gears as IGear[]}
        rowKey={"id"}
        isLoading={isLoading}
        showSerialNo
        rowActions={(row) => (
          <div className="flex gap-2 items-center">
            <Link href={`/dashboard/provider/update-gear/?id=${row.id}`}>
              {" "}
              <Button size="sm">
                {" "}
                <Edit />
              </Button>
            </Link>

            <ActionDialog
              onAction={() => handleDelete(row.id)}
              triggerBtn={
                <Button variant="destructive">
                  <TrashIcon />
                </Button>
              }
              loading={isPending}
              actionBtnProps={{ variant: "destructive" }}
              loadingText="Deleting..."
            />
          </div>
        )}
      />
    </div>
  );
};

export default ProviderGearsTable;
