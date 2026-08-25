

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
