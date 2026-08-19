"use client";

import React from "react";
import { PublicNavbar } from "../(public)/_components/shared/PublicNavbar";


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto flex min-h-[calc(100vh-56px)] items-center justify-center overflow-y-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
