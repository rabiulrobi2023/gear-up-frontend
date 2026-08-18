"use client";

import RequiredLabel from "@/components/shared/RequiredLabel";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Role } from "@/constants";
import { IRegisterFormValues } from "@/interface/auth.interface";
import { registerSchema } from "@/validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAction } from "../_actions/registerAction";

const RegistrationForm = () => {
  const router = useRouter();

  const form = useForm<IRegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      role: Role.CUSTOMER,
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [state, formAction] = useActionState(registerAction, null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: IRegisterFormValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role);
    formData.append("phone", values.phone || "");
    formData.append("address", values.address || "");
    formData.append("password", values.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "User registered successfully");

      router.push("auth/login");
    } else {
      toast.error(state.message || "User registration failed");
    }
  }, [state, router]);

  return (
    <>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="name">Name</RequiredLabel>

                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="email">Email</RequiredLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="phone">Phone</Label>

                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Address */}
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="address">Address</Label>

                  <Input
                    {...field}
                    id="address"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Chandipur, Parbatipur, Dinajpur"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Role */}
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel>Role</RequiredLabel>

                  <RadioGroup
                    className="flex p-0"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Field orientation="horizontal">
                      <RadioGroupItem value={Role.CUSTOMER} id="customer" />

                      <FieldLabel htmlFor="customer" className="font-normal">
                        {Role.CUSTOMER}
                      </FieldLabel>
                    </Field>

                    <Field orientation="horizontal">
                      <RadioGroupItem value={Role.PROVIDER} id="provider" />

                      <FieldLabel htmlFor="provider" className="font-normal">
                        {Role.PROVIDER}
                      </FieldLabel>
                    </Field>
                  </RadioGroup>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="password">Password</RequiredLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="confirmPassword">
                    Confirm Password
                  </RequiredLabel>

                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
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

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="register-form"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <>
              Registering...
              <Spinner />
            </>
          ) : (
            "Register"
          )}
        </Button>

        <span>
          Already have an account?
          <Button
            type="button"
            variant="link"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </span>
      </CardFooter>
    </>
  );
};

export default RegistrationForm;
