"use server";

import { getMe } from "@/app/(auth)/_service/getMe";
import { Role } from "@/interface/auth.interface";
import SelfOrderList from "../../_components/shared/SelfOrderList";
import { Suspense } from "react";
import OrderCardSkeletonList from "../../_components/shared/OrderCardSkeletonList";

const page = async () => {
  const user = await getMe();
  return (
    <div>
      <SelfOrderList role={user?.data?.role as Role} />
    </div>
  );
};

export default page;
