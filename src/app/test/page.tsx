"use client";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICategoryResponse } from "@/interface/category.interface";

interface FilterFormValues {
  search: string;
  categoryName: string;
  minPrice?: number;
  maxPrice?: number;
}

export default function GearFilterNavbar({
  categories,
}: {
  categories: ICategoryResponse;
}) {
  const form = useForm<FilterFormValues>({
    defaultValues: {
      search: "",
      categoryName: "all",
      minPrice: undefined,
      maxPrice: undefined,
    },
  });

  const onSubmit = (values: FilterFormValues) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-end gap-4"
    >
      {/* Search */}
      <div className="flex-1">
        <label className="mb-2 block">Search</label>

        <Input
          placeholder="Search by gear..."
          {...form.register("search")}
        />
      </div>

      {/* Category */}
      <div className="flex-1">
        <label className="mb-2 block">Category</label>

        <Controller
          name="categoryName"
          control={form.control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>

                {categories.data.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Min Price */}
      <div>
        <label className="mb-2 block">Min Price</label>

        <Input
          type="number"
          placeholder="0"
          {...form.register("minPrice", {
            valueAsNumber: true,
          })}
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="mb-2 block">Max Price</label>

        <Input
          type="number"
          placeholder="1000"
          {...form.register("maxPrice", {
            valueAsNumber: true,
          })}
        />
      </div>

      <Button type="submit">
        Search
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          form.reset({
            search: "",
            categoryName: "all",
            minPrice: undefined,
            maxPrice: undefined,
          })
        }
      >
        Clear
      </Button>
    </form>
  );
}