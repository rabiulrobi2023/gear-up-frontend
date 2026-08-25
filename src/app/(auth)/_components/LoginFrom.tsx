"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ILoginFormValues } from "@/interface/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "../_actions/loginAction";
import { loginSchema } from "@/validation/loginSchema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || "/";

  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "customer1@gmail.com",
      password: "111111",
    },
    mode: "onTouched",
  });

  const [state, formAction] = useActionState(
    loginAction.bind(null, redirectTo),
    null,
  );

  const [pending, startTransition] = useTransition();

  const onSubmit = (values: ILoginFormValues) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) {
      return;
    }

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }

    toast.success("Login successfully");
  }, [state]);

  return (
    <>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="email">Email</Label>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />

                  {fieldState.invalid && (
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
                  <Label htmlFor="password">Password</Label>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
        <Button
          type="submit"
          form="login-form"
          disabled={pending}
          className="w-full"
        >
          {pending ? (
            <>
              Logging...
              <Spinner />
            </>
          ) : (
            "Login"
          )}
        </Button>

        <span>
          Have no account?
          <Button
            type="button"
            variant="link"
            onClick={() => router.push("/auth/register")}
          >
            Sign Up
          </Button>
        </span>
      </CardFooter>
    </>
  );
}
