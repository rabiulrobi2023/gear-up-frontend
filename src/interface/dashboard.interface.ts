import { LucideIcon } from "lucide-react";
import { Role } from "./auth.interface";

export type IUserDashboardMenus = {
  [key in Role]: IDashboardMenus[];
};

export interface IDashboardMenus {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface IStatisticItem {
  title: string;
  value: number | undefined;
  description: string;
  icon: LucideIcon;
}

export interface IAdminStatisticsResponse {
  success: true;
  message: string;
  data: {
    totalUsers: number;
    totalGears: number;
    totalRentals: number;
  };
}
