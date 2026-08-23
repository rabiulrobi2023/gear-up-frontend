
import { Role } from "@/constants/auth.constant";
import { LucideIcon } from "lucide-react";

export type IUserDashboardMenus = {
  [key in Role]: IDashboardMenus[];
};

export interface IDashboardMenus {
  label: string;
  href: string;
  icon: LucideIcon;
}
