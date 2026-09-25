import { Label } from "@/components/ui/label";
import React from "react";


const RequiredLabel = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) => {
  return (
    <Label htmlFor={htmlFor} className="gap-0">
        {children}<span className="text-destructive">*</span>
    </Label>
  );
};

export default RequiredLabel;
