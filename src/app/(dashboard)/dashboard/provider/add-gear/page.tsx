import AddAndUpdateGearForm from "@/app/(dashboard)/_components/provider/AddAndUpdateGearForm";
import { getAllCategories } from "@/app/(public)/_actions/getAllCategories";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddGearPage = async () => {
  const categoryRes = await getAllCategories();
  const categories = categoryRes.data;
  return (
    <Card className="w-full min-w-sm md:min-w-md md:max-w-lg mx-auto rounded-md ring-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Add a Gear
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to add a gear
        </CardDescription>
      </CardHeader>
      <AddAndUpdateGearForm categories={categories} mode="add" />
    </Card>
  );
};

export default AddGearPage;
