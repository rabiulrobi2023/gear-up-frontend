"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginFormValues } from "@/interface/auth.interface";
import { loginFormSchema } from "@/validation/loginFormSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { loginAction } from "../_actions/loginAction";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm() {
  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const redirectTo = useSearchParams().get("redirectTo");
  const [state, formAction, pending] = useActionState(
    loginAction.bind(null, redirectTo as string),
    null,
  );

  return (
    <>
      <CardContent>
        <form id="login-form" action={formAction}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="email">Password</Label>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {pending ? (
          <Button form="login-form" className="w-full disabled:">
            Logging...
            <Spinner />
          </Button>
        ) : (
          <Button type="submit" form="login-form" className="w-full">
            Login
          </Button>
        )}
        <span>
          Have no any account?<Button variant="link">Sign Up</Button>
        </span>
      </CardFooter>
    </>
  );
}
