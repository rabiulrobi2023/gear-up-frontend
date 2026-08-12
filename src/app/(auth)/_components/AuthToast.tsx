"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AuthToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") !== "success") {
      return;
    }

    toast.success("User login successfully");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("login");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
}
