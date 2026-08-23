import { UserDashboardMenus } from "@/app/(dashboard)/_constants/userDashaboardMenus";
import { IRole } from "@/interface/user.interface";

export const getUserMenus = (role: IRole) => {
  return UserDashboardMenus[role];
};
