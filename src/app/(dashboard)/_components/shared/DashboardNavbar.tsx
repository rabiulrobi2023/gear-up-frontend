import UserDropdownMenu from "@/app/(auth)/_components/UserDropdownMenu";
import { getMe } from "@/app/(auth)/_service/getMe";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { IUserResponse } from "@/interface/user.interface";

const DashboardNavbar = async () => {
  const user = await getMe();
  return (
    <header className="flex h-16 items-center gap-2  justify-between pr-2 border-b sticky top-0 z-10 bg-gray-50 ">
      <SidebarTrigger />
      <div className="text-2xl font-bold">
        Gear
        <span className="text-sky-700"> Up</span>
      </div>
      <UserDropdownMenu user={user as IUserResponse} />
    </header>
  );
};

export default DashboardNavbar;
