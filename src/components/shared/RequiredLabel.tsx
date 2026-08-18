import React from "react";
import { Label } from "../ui/label";

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
