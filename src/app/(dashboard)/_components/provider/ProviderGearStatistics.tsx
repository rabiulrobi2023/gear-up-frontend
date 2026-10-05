"use client";

import { Clock3, Package, PackageCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  usePendingOrders,
  useProviderGearStatistics,
} from "@/hooks/provider.hooks";
import DashboardStatistics from "../shared/DashboardStatistics";
import { IStatisticItem } from "@/interface/dashboard.interface";

export function ProviderGearStatistics() {
  const { data, isLoading } = useProviderGearStatistics();

  const statistics = data?.data;

  const items: IStatisticItem[] = [
    {
      title: "Total Gear",
      value: statistics?.totalGears,
      description: "Total gears listed",
      icon: Package,
    },
    {
      title: "Active Gear",
      value: statistics?.activeGears,
      description: "Currently available",
      icon: PackageCheck,
    },
    {
      title: "Pending Orders",
      value: statistics?.pendingGears,
      description: "Orders need attention",
      icon: Clock3,
    },
  ];

  return <DashboardStatistics items={items} />;
}
