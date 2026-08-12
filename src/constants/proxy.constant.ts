import { envVar } from "@/config/envConfig";
import { NodeEnv } from ".";

export const AUTH_ROUTES = ["/auth/login", "/auth/register"];
export const PUBLIC_ROUTES = ["/", "/gear"];

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: envVar.ENVIRONMENT === NodeEnv.PRODUCTION,
  sameSite: "lax" as const,
  path: "/",
};


import { Role } from "@/constants";

export const DASHBOARD_ROUTES = {
  [Role.ADMIN]: "/dashboard/admin",
  [Role.CUSTOMER]: "/dashboard/customer",
  [Role.PROVIDER]: "/dashboard/provider",
} as const;
