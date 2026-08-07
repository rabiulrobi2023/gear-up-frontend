import React from "react";
import { PublicNavbar } from "../(public)/_components/shared/PublicNavbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
