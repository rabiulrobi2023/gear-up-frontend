"use client";

import { ActionDialog } from "@/components/shared/ActionDialog";
import { DataTable } from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteGear, useGetAllGears } from "@/hooks/provider.hooks";
import { IGear, INestedGearField } from "@/interface/gear.interface";
import { IDataTableColumn } from "@/interface/table.interface";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, TrashIcon } from "lucide-react";
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
    className: "",
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
    className: "text-center",
  },
];

const ProviderGearsTable = () => {
  const { data, isLoading } = useGetAllGears();
  const gears = data?.data.data;

  const { mutateAsync, isPending } = useDeleteGear();


  const handleDelete = async (id: string) => {
    try {
      const res = await mutateAsync(id);
      toast.success(res.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      throw error;
    }
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
              dialogDescription="Are you sure you want to delete this gear? This action cannot be undone."
              actionBtnText="Delete"
            />
          </div>
        )}
      />
    </div>
  );
};

export default ProviderGearsTable;
