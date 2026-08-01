"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { IApiResponse, IUser } from "@/interface";
import { PUBLIC_NAVBAR_ITEMS } from "../../_constants";
import UserDropdownMenu from "../../../../components/shared/UserDropdownMenu";


interface PublicNavbarProps {
  user?: IApiResponse<IUser> | null;
}

export function PublicNavbar({ user }: PublicNavbarProps) {
  const pathname = usePathname();

  const currentUser = user?.data;

  return (
    <header className="sticky top-0 z-50 border-b bg-background px-3 md:px-0">
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-bold">
                  Gear
                  <span className="text-sky-700"> Up</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-4 flex flex-col gap-2">
                {PUBLIC_NAVBAR_ITEMS.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-xl font-bold">
            Gear
            <span className="text-sky-700"> Up</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {PUBLIC_NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <UserDropdownMenu user={user} />
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}