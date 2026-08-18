import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegistrationForm from "../../_components/RegistrationForm";

const RegisterPage = () => {
  return (
    <Card className="w-full min-w-sm md:min-w-md md:max-w-lg rounded-md">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Register your account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to register your account
        </CardDescription>
      </CardHeader>
      <RegistrationForm />
    </Card>
  );
};

export default RegisterPage;
