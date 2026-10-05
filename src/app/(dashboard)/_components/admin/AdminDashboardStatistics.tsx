"use client";

import { useGetAdminStatistics } from "@/hooks/admin";
import { IStatisticItem } from "@/interface/dashboard.interface";
import { Package, ShoppingCart, Users } from "lucide-react";
import DashboardStatistics from "../shared/DashboardStatistics";

const AdminDashboardStatistics = () => {
  const { data: statistics, isPending } = useGetAdminStatistics();
  console.log(statistics);
  const items: IStatisticItem[] = [
    {
      title: "Total Users",
      value: statistics?.data.totalUsers,
      description: "Registered users",
      icon: Users,
    },
    {
      title: "Total Gears",
      value: statistics?.data.totalGears,
      description: "Gears listed on the platform",
      icon: Package,
    },
    {
      title: "Total Rentals",
      value: statistics?.data.totalRentals,
      description: "Total rental orders",
      icon: ShoppingCart,
    },
  ];
  return (
    <div>
      <DashboardStatistics items={items} />
    </div>
  );
};

export default AdminDashboardStatistics;
