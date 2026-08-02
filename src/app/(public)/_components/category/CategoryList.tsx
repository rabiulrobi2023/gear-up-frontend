"use server";

import { IApiResponse } from "@/interface";

import { CategoryCard } from "./CategoryCard";
import { ICategory } from "@/interface/category.interface";

const CategoryList = async ({
  categories,
}: {
  categories: IApiResponse<ICategory[]>;
}) => {
  if (!categories?.data?.length) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No news found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
      {categories?.data?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
