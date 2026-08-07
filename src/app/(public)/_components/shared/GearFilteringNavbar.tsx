"use client";

import { useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebounce } from "use-debounce";

// Shadcn v4 standalone UI elements
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// 1. Validation Schema (Defined easily using Zod)
const filterFormSchema = z.object({
  searchTerm: z.string().optional(),
  categoryName: z.string().optional(),
  minRate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Must be a number",
    }),
  maxRate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Must be a number",
    }),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

export function GearFilterNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 2. React Hook Form Initialization (Reads initial data from URL)
  const {
    register,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      searchTerm: searchParams.get("searchTerm") || "",
      categoryName: searchParams.get("categoryName") || "all",
      minRate: searchParams.get("minRate") || "",
      maxRate: searchParams.get("maxRate") || "",
    },
  });

  // 3. Watch hook to capture data in real-time
  const formValues = useWatch({ control });
  const [debouncedValues] = useDebounce(formValues, 300);

  // 4. Update Next.js URL query parameters with debounced data
  // useEffect(() => {
  //   // If there are Zod validation errors, stop the URL update
  //   if (Object.keys(errors).length > 0) return;

  //   const params = new URLSearchParams(searchParams.toString());

  //   if (debouncedValues.searchTerm)
  //     params.set("searchTerm", debouncedValues.searchTerm);
  //   else params.delete("searchTerm");

  //   if (
  //     debouncedValues.categoryName &&
  //     debouncedValues.categoryName !== "all"
  //   ) {
  //     params.set("categoryName", debouncedValues.categoryName);
  //   } else params.delete("categoryName");

  //   if (debouncedValues.minRate) params.set("minRate", debouncedValues.minRate);
  //   else params.delete("minRate");

  //   if (debouncedValues.maxRate) params.set("maxRate", debouncedValues.maxRate);
  //   else params.delete("maxRate");

  //   // Sync URL in the background using React 19 transition (keeps UI lag-free)
  //   startTransition(() => {
  //     router.push(`${pathname}?${params.toString()}`, { scroll: false });
  //   });
  // }, [debouncedValues, errors, pathname, router, searchParams]);

  // Function to reset or clear filters
  const handleClear = () => {
    reset({
      searchTerm: "",
      categoryName: "all",
      minRate: "",
      maxRate: "",
    });
  };

  return (
    <form className="relative space-y-4 md:space-y-0 md:flex md:items-end md:gap-4 p-4 border rounded-lg bg-card">
      {/* Loading animation while query syncs in the background */}
      {isPending && (
        <div className="absolute top-2 right-2 text-xs text-muted-foreground animate-pulse">
          Loading...
        </div>
      )}

      {/* Search Field */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="searchTerm">Search</Label>
        <Input
          id="searchTerm"
          placeholder="e.g., epson, canon..."
          {...register("searchTerm")}
        />
      </div>

      {/* Category Select */}
      <div className="w-full md:w-[200px] space-y-2">
        <Label htmlFor="categoryName">Category</Label>
        <Select
          onValueChange={(value) => setValue("categoryName", value)}
          value={formValues.categoryName}
        >
          <SelectTrigger id="categoryName">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Min Price (with Zod error handling) */}
      <div className="w-full md:w-[120px] space-y-2">
        <Label htmlFor="minRate">Min Price</Label>
        <Input id="minRate" placeholder="0" {...register("minRate")} />
        {errors.minRate && (
          <p className="text-xs text-destructive font-medium">
            {errors.minRate.message}
          </p>
        )}
      </div>

      {/* Max Price (with Zod error handling) */}
      <div className="w-full md:w-[120px] space-y-2">
        <Label htmlFor="maxRate">Max Price</Label>
        <Input id="maxRate" placeholder="1000" {...register("maxRate")} />
        {errors.maxRate && (
          <p className="text-xs text-destructive font-medium">
            {errors.maxRate.message}
          </p>
        )}
      </div>

      {/* Clear Filters Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleClear}
        className="w-full md:w-auto mt-2 md:mt-0"
      >
        Clear Filters
      </Button>
    </form>
  );
}
