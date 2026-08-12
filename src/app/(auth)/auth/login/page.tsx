import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "../../_components/LoginFrom";

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-73px)] flex items-center">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-center font-bold text-xl">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
       <LoginForm/>
      </Card>
    </div>
  );
};

export default LoginPage;
