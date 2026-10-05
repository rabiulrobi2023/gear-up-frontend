import AdminDashboardStatistics from "../../_components/admin/AdminDashboardStatistics";

const AdminPage = async () => {
  return (
    <div className="space-y-3 ">
      <p className="text-xl font-bold">User, Gear and Rental Statistics</p>
      <AdminDashboardStatistics />
    </div>
  );
};

export default AdminPage;
