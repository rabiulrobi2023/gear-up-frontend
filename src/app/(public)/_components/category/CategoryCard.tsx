"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {} from "@/interface";
import { ICategory } from "@/interface/category.interface";

export function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Link href={`/${category.slug}`}>
      {" "}
      <Card className="mx-auto mt-2 w-full max-w-sm gap-2 pt-0 pb-3 cursor-pointer shadow-xl hover:shadow-2xl ">
        <Image
          unoptimized
          src={
            category.categoryPhoto ||
            "https://praise.com.sg/wp-content/uploads/2024/08/gallery-33.png"
          }
          width={600}
          height={400}
          alt={category.name}
          className="h-48 w-full object-center z-0"
        />

        <CardHeader className="pt-0">
          <CardTitle className="text-center">{category.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
