
import { DASHBOARD_ROUTES } from "@/app/(dashboard)/_constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IApiResponse,  } from "@/interface";
import { IUser } from "@/interface/user.interface";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";



const UserDropdownMenu = ({ user }: { user?: IApiResponse<IUser> }) => {
// const router = useRouter()
  
    const dashboardHref =
    DASHBOARD_ROUTES[user?.data?.role as keyof typeof DASHBOARD_ROUTES] ?? "/";

  const userMenuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: dashboardHref,
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

    // const handleLogout = async () => {
    //   try {
    //     await logout();

    //     toast.success("User logged out successfully!");

    //     router.replace("/");
    //     router.refresh();
    //   } catch {
    //     toast.error("Failed to log out.");
    //   }
    // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open user menu"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <User className="size-4 text-primary" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{user?.data?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.data?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {userMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem key={item.href}>
              <Link href={item.href}>
                <Icon className="mr-2 size-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
