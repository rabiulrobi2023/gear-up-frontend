import React from "react";
import { PublicNavbar } from "./_components/shared/PublicNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      {children}
    </div>
  );
};

export default layout;
