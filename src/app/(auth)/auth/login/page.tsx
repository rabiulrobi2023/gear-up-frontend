import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "../../_components/LoginFrom";
import { Suspense } from "react";
import LoginFormSkeleton from "../../_components/LoginFormSkeleton";

const LoginPage = async () => {
  return (
    <Card className="w-full min-w-sm max-w-sm overflow-auto ring-0 shadow-2xl ">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Login to your account
        </CardTitle>

        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </Card>
  );
};

export default LoginPage;
