import { Role } from "@/constants";

export const DASHBOARD_ROUTES = {
  [Role.ADMIN]: "/dashboard/admin",
  [Role.CUSTOMER]: "/dashboard/customer",
  [Role.PROVIDER]: "/dashboard/provider",
} as const;


