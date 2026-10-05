"use client";

import { ActionDialog } from "@/components/shared/ActionDialog";
import SearchBox from "@/components/shared/SearchBox";
import { DataTable } from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { useChangeUserStatus, useGetAllUsers } from "@/hooks/admin";
import { UserStatus } from "@/interface/auth.interface";
import { IDataTableColumn } from "@/interface/table.interface";
import { IUser } from "@/interface/user.interface";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const usersTableColumn: IDataTableColumn<IUser>[] = [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "phone",
    header: "Phone",
  },
  {
    key: "address",
    header: "Address",
  },
  {
    key: "role",
    header: "Role",
    className: "text-center",
  },
  {
    key: "status",
    header: "Status",
    className: "text-center",
    accessor: (row) => (
      <p
        className={cn(
          row.status === "ACTIVE" ? "text-green-600" : "text-destructive",
        )}
      >
        {row.status}
      </p>
    ),
  },
];

const UsersTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  console.log(search);

  const { data: users, isPending } = useGetAllUsers({
    searchTerm: search,
    page,
  });

  const { mutateAsync, isPending: statusChangePending } = useChangeUserStatus();

  const handleStatusChange = async (row: IUser) => {
    const status =
      row.status === UserStatus.ACTIVE ? UserStatus.SUSPEND : UserStatus.ACTIVE;

    try {
      const res = await mutateAsync({ id: row.id, payload: { status } });
      toast.success(res.message as string);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end absolute right-0 -top-2">
        <SearchBox
          onChange={(value) => {
            setSearch(value);
            setPage("1");
          }}
          value={search}
          delay={1000}
        />
      </div>
      <DataTable
        columns={usersTableColumn}
        data={users?.data.data || []}
        rowKey="id"
        emptyMessage="No user found"
        isLoading={isPending}
        showSerialNo
        rowActions={(row) => (
          <ActionDialog
            triggerBtn={
              <Button
                variant={
                  row.status === UserStatus.ACTIVE ? "destructive" : "default"
                }
                size="sm"
                className="rounded-sm"
              >
                {row.status === UserStatus.ACTIVE ? "Suspend" : "Active"}
              </Button>
            }
            onAction={() => handleStatusChange(row)}
            loading={statusChangePending}
            actionBtnText={
              row.status === UserStatus.ACTIVE ? "Suspend" : "Active"
            }
            actionBtnProps={{
              variant:
                row.status === UserStatus.ACTIVE ? "destructive" : "default",
            }}
            dialogDescription={
              row.status === UserStatus.ACTIVE
                ? "Are you sure you want to suspend this user?"
                : "Are you sure you want to activate this user?"
            }
          />
        )}
      />
    </div>
  );
};

export default UsersTable;
