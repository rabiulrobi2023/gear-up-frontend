"use client";

import { Clock3, Package, PackageCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  usePendingOrders,
  useProviderGearStatistics,
} from "@/hooks/provider.hooks";

export function ProviderGearStatistics() {
  const { data, isLoading } = useProviderGearStatistics();

  const statistics = data?.data;

  const items = [
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

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="!shadow-xl ring-0 bg-primary/3 rounded-md"
          >
            <CardContent className="flex items-center justify-center ">
              <div className="space-y-1 flex flex-col items-center">
                <p className="text-xl  font-bold text-primary">{item.title}</p>

                <p className="text-xl font-bold">{item.value}</p>

                <p className=" text-muted-foreground">{item.description}</p>
              </div>

              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
