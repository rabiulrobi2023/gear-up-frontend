"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterFormValues {
  search: string;
  categoryName: string;
  minPrice: number | "";
  maxPrice: number | "";
}

export default function GearFilterNavbar() {
  const form = useForm<FilterFormValues>({
    defaultValues: {
      search: "",
      categoryName: "all",
      minPrice: "",
      maxPrice: "",
    },
  });

  const onSubmit = (values: FilterFormValues) => {};

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-center justify-between gap-1 rounded-xl bg-card mb-2 w-full container"
    >
      {/* Search */}
      <div className="w-full md:flex-1">
        <label className="">Search</label>
        <Input
          placeholder="Search by gear name or brand..."
          {...form.register("search")}
        />
      </div>

      {/* Category */}
      <div className="flex flex-3 gap-4 items-center">
        <div className="flex-1">
          <label className="">Category</label>

          <Select
            defaultValue="all"
            onValueChange={(value) =>
              form.setValue("categoryName", value as string)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="outdoor">Outdoor & Adventure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-2">
            <label className="">Min Price</label>

            <Input
              type="number"
              placeholder="0"
              {...form.register("minPrice", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-2">
            <label className="">Max Price</label>

            <Input
              type="number"
              placeholder="1000"
              {...form.register("maxPrice", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* Buttons */}
        <Button
          className="mt-auto"
          type="button"
          variant="outline"
          onClick={() =>
            form.reset({
              search: "",
              categoryName: "all",
              minPrice: "",
              maxPrice: "",
            })
          }
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
