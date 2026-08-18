import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RegisterToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (searchParams.get("register") !== "register") {
      return;
    }

    toast.success("User registration successfully");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("register");

    router.replace(pathname);
  }, [searchParams, router, pathname]);

  return null;
};

export default RegisterToast;
