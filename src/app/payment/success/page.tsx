import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader className="flex flex-col gap-5 items-center text-center">
          <CheckCircle2 className="size-12 text-green-600 text-center items-center flex justify-center" />

          <CardTitle className="text-2xl">Payment Successful!</CardTitle>

          <p className="text-sm text-muted-foreground">
            Your payment has been successfully processed.
          </p>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg  p-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Package className="size-5" />
              <span className="font-medium">Rental Order Confirmed</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Your gear rental request has been successfully placed. You can
              view your order details from your orders page.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full">
            <Link href="/dashboard/customer">
              View My Orders
              <ArrowRight />
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/gear">Continue Browsing</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
