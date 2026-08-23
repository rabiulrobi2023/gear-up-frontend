import {
  IDashboardMenus,
  IUserDashboardMenus,
} from "@/interface/dashboardMenu.interface";
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  PackageOpen,
  ShoppingBasket,
  Store,
  Users,
} from "lucide-react";

export const customerDashboardMenus: IDashboardMenus[] = [
  {
    label: "All Order",
    href: "/dashboard/customer",
    icon: ShoppingBasket,
  },
  {
    label: "Payments",
    href: "/dashboard/customer/payments",
    icon: CircleDollarSign,
  },
];

export const providerDashboardMenus: IDashboardMenus[] = [
  {
    label: "Gears",
    href: "/dashboard/provider",
    icon: Store,
  },
  {
    label: "Orders",
    href: "/dashboard/provider/orders",
    icon: PackageOpen,
  },
];

export const adminDashboardMenus: IDashboardMenus[] = [
  {
    label: "Statistics",
    href: "/dashboard/admin",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];

export const UserDashboardMenus: IUserDashboardMenus = {
  CUSTOMER: customerDashboardMenus,
  ADMIN: customerDashboardMenus,
  PROVIDER: providerDashboardMenus,
};
