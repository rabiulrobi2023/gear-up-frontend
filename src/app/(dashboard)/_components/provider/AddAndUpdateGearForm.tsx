"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import RequiredLabel from "@/components/shared/RequiredLabel";
import { IAddGearFormData, IGear } from "@/interface/gear.interface";
import { addGearSchema } from "@/validation/addGearSchema";
import { addGearAction } from "../../_actions/addGearAction";
import { ICategory } from "@/interface/category.interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateGearAction } from "../../_actions/updateGearAction";
import { useQueryClient } from "@tanstack/react-query";

interface IAddGearFormProps {
  gear?: IGear;
  categories: ICategory[];
  mode: "add" | "edit";
}

const AddAndUpdateGearForm = ({
  gear,
  categories,
  mode,
}: IAddGearFormProps) => {
  const action = mode === "add" ? addGearAction : updateGearAction;
  const router = useRouter();

  const form = useForm<IAddGearFormData>({
    resolver: zodResolver(addGearSchema),
    mode: "all",
    defaultValues: {
      name: "",
      brand: "",
      categoryId: "",
      description: "",
      image: "",
      dailyRate: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !gear || !categories.length) return;

    form.reset({
      name: gear.name ?? "",
      categoryId: gear.category?.id ?? "",
      brand: gear.brand ?? "",
      description: gear.description ?? "",
      image: gear.image ?? "",
      dailyRate: Number(gear.dailyRate) || 0,
      stock: Number(gear.stock) || 0,
    });
  }, [gear, mode, form, categories]);

  const [state, formAction] = useActionState(action.bind(null, gear?.id), null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: IAddGearFormData) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("categoryId", values.categoryId);
    formData.append("brand", values.brand || "");
    formData.append("description", values.description || "");
    formData.append("image", values.image || "");
    formData.append("dailyRate", String(values?.dailyRate));
    formData.append("stock", String(values.stock));

    startTransition(() => {
      formAction(formData);
    });
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          `Gear ${mode === "add" ? "added" : "updated"} successfully`,
      );
      if (mode === "edit") {
        queryClient.invalidateQueries({ queryKey: ["providersGears"] });
      }

      router.push("/dashboard/provider/my-gears");
    } else {
      toast.error(state.message || "User registration failed");
    }
  }, [state, router, queryClient, mode]);

  return (
    <>
      <CardContent>
        <form id="gear-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="name">Gear Name</RequiredLabel>

                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter gear name"
                    autoComplete="name"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Category */}
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="name">Category</RequiredLabel>

                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent position={"popper"}>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="focus:bg-primary focus:text-white not-data-[variant=destructive]:focus:**:text-white"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Brand*/}
            <Controller
              name="brand"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="brand">Brand</Label>

                  <Input
                    {...field}
                    id="brand"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter brand"
                    autoComplete="brand"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="description">Description</Label>

                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write description"
                    autoComplete="description"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Daily Rate */}
            <Controller
              name="dailyRate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="dailyRate">Daily Rate</RequiredLabel>

                  <Input
                    {...field}
                    id="dailyRate"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter daily rate"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Stock */}
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="stock">Stock</RequiredLabel>

                  <Input
                    {...field}
                    id="stock"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter stock amount"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/*Image*/}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="brand">Gear Image Link</Label>

                  <Input
                    {...field}
                    id="image"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.jpg"
                    autoComplete="image"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="gear-form"
          disabled={isPending || (mode === "edit" && !form.formState.isDirty)}
        >
          {mode === "add"
            ? isPending
              ? "Adding..."
              : "Add"
            : isPending
              ? "Updating..."
              : "Update"}
        </Button>
      </CardFooter>
    </>
  );
};

export default AddAndUpdateGearForm;
