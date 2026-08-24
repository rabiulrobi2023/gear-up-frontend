import { UserDashboardMenus } from "@/app/(dashboard)/_constants/userDashaboardMenus";
import { Role } from "@/interface/auth.interface";
import { IRole } from "@/interface/user.interface";

export const getUserMenus = (role: Role) => {
  return UserDashboardMenus[role];
};
