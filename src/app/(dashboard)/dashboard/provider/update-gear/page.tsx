"use client";

import AddAndUpdateGearForm from "@/app/(dashboard)/_components/provider/AddAndUpdateGearForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllCategories, useGetSingleGear } from "@/hooks/gear.hooks";
import { useSearchParams } from "next/navigation";

const UpdateGearPage = () => {
  const params = useSearchParams();
  const { data: gearRes, isLoading: gearLoading } = useGetSingleGear(
    params.get("id") as string,
  );
  const { data: categoryRes, isLoading: categoriesLoading } =
    useGetAllCategories();

  const categories = categoryRes?.data || [];


  return (
    <Card className="card rounded-md ring-0 shadow-none sm:w-2/3 sm:mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Update Your Gear
        </CardTitle>
        <CardDescription className="text-center">
          Change your information below to update your gear
        </CardDescription>
      </CardHeader>
      <AddAndUpdateGearForm
        categories={categories}
        gear={gearRes?.data}
        mode="edit"
      />
    </Card>
  );
};

export default UpdateGearPage;
