import UsersTable from "@/app/(dashboard)/_components/admin/UsersTable";

const page = () => {
  return (
    <div className="space-y-2 relative">
      <h1 className="text-xl font-bold">Users</h1>
      <UsersTable />
    </div>
  );
};

export default page;
