import {
  IDashboardMenus,
  IUserDashboardMenus,
} from "@/interface/dashboard.interface";
import {
  ChartNoAxesCombined,
  CircleDollarSign,
  LayoutDashboard,
  PackageOpen,
  PackagePlus,
  ShoppingBasket,
  Store,
  Users,
} from "lucide-react";

export const customerDashboardMenus: IDashboardMenus[] = [
  {
    label: "My Orders",
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
    label: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },

  {
    label: "Orders",
    href: "/dashboard/provider/orders",
    icon: PackageOpen,
  },

  {
    label: "My Gears",
    href: "/dashboard/provider/my-gears",
    icon: Store,
  },
  {
    label: "Add Gear",
    href: "/dashboard/provider/add-gear",
    icon: PackagePlus,
  },
];

export const adminDashboardMenus: IDashboardMenus[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },

  {
    label: "All Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];

export const UserDashboardMenus: IUserDashboardMenus = {
  CUSTOMER: customerDashboardMenus,
  ADMIN: adminDashboardMenus,
  PROVIDER: providerDashboardMenus,
};
