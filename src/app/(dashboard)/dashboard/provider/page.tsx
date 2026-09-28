import { ProviderGearStatistics } from "../../_components/provider/ProviderGearStatistics";
import RecentOrderTable from "../../_components/provider/RecentOrderTable";

const MyGearPage = async () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold">Gear and Order Statistics</p>
      <ProviderGearStatistics />

      <div className="mt-4">
        <p className="text-xl font-bold">Recent Orders</p>
        <RecentOrderTable />
      </div>
    </div>
  );
};

export default MyGearPage;
