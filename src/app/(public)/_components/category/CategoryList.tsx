"use server";

import { IApiResponse, ICategory } from "@/interface";
import { getAllCategories } from "../../_actions/getAllCategories";

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

  console.log(categories);

  // return (
  //   <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 mt-5  ">
  //     {categories.data.data.map((post) => (
  //       <NewsCard key={post.id} post={post} isEdit={isEdit} />
  //     ))}
  //   </div>
  // );
};

export default CategoryList;
