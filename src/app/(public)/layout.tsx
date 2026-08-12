import React from "react";
import { PublicNavbar } from "./_components/shared/PublicNavbar";
import { getMe } from "../(auth)/_service/getMe";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <div>
      <PublicNavbar user={user} />
      {children}
    </div>
  );
};

export default layout;
