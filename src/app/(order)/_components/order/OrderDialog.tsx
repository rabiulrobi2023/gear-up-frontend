"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IGear } from "@/interface/gear.interface";
import Image from "next/image";

import RequiredLabel from "../../../../components/shared/RequiredLabel";
import { Controller, useForm } from "react-hook-form";
import React, {
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";
import { createOrderSchema } from "@/validation/createOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { CalendarDays, CalendarRangeIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "../../../../components/ui/calendar";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Spinner } from "../../../../components/ui/spinner";
import { placeOrder } from "../../_actions/placeOrder";
import { toast } from "sonner";
import { ICreateOrderPayload } from "@/interface/order.interface";

export function OrderDialog({ gear }: { gear: IGear }) {
  const router = useRouter();

  const form = useForm<ICreateOrderPayload>({
    resolver: zodResolver(createOrderSchema(gear)),
    mode: "all",
    defaultValues: {
      quantity: 1,
    },
  });
  const [startDateOpen, setStarDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const startDate = form.watch("startDate");
  const returnDate = form.watch("returnDate");
  const quantity = form.watch("quantity") || 0;

  useEffect(() => {
    if (startDate && returnDate && returnDate <= startDate) {
      form.resetField("returnDate");
    }
  }, [returnDate, startDate, form]);

  const totalDay =
    startDate && returnDate
      ? differenceInCalendarDays(returnDate, startDate)
      : 0;

  const totalAmount = Number(
    totalDay * quantity * Number(gear.dailyRate),
  ).toFixed(2);

  const [state, formAction] = useActionState(placeOrder, null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: ICreateOrderPayload) => {
    const formData = new FormData();

    formData.append("itemId", gear.id);
    formData.append("quantity", values.quantity.toString());
    formData.append("startDate", values.startDate.toISOString());
    formData.append("returnDate", values.returnDate.toISOString());

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "User registered successfully");
      router.replace(`/dashboard/customer/orders/${state?.data?.id}/pay`);
    } else {
      toast.error(state.message || "User registration failed");
    }
  }, [state, router]);

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)} id="order-form">
        <DialogTrigger asChild>
          <Button>Rent Now</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">Gear Order</DialogTitle>
            <DialogDescription>
              Rent a gear. Click payment when you&apos;re done. Otherwise click
              on cancel.
            </DialogDescription>
            <div className="flex items-center gap-3">
              <Image
                unoptimized
                src={gear?.image}
                alt={gear?.name}
                width={100}
                height={100}
              />
              <div>
                <p className="font-bold">{gear.name}</p>
                <p>Price: {gear.dailyRate} TK/day</p>
              </div>
            </div>
          </DialogHeader>
          <FieldGroup className="flex flex-row gap-2">
            {/* Start Date */}
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="startDate">Start Date</RequiredLabel>
                  <Popover open={startDateOpen} onOpenChange={setStarDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {field.value ? (
                          format(field.value, "dd-MMM-yyyy")
                        ) : (
                          <span>Select start date</span>
                        )}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setStarDateOpen(false);
                        }}
                        defaultMonth={field.value}
                        disabled={{ before: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            {/* Return Date */}
            <Controller
              name="returnDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="returnDate">
                    Return Date
                  </RequiredLabel>
                  <Popover
                    open={returnDateOpen}
                    onOpenChange={setReturnDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        {field.value ? (
                          format(field.value, "dd-MMM-yyyy")
                        ) : (
                          <span>Select return date</span>
                        )}
                        <CalendarDays />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setReturnDateOpen(false);
                        }}
                        defaultMonth={field.value}
                        disabled={{
                          before: form.watch("startDate")
                            ? addDays(form.watch("startDate"), 1)
                            : new Date(),
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="flex flex-row justify-between">
            {/* Quantity */}
            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="w-1/2">
                  <RequiredLabel htmlFor="name">Quantity</RequiredLabel>
                  <Input
                    {...field}
                    id="quantity"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter quantity"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    max={gear?.stock}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <dl className="grid grid-cols-[auto_auto_1fr] gap-x-2 text-right">
              <dt>Total Days</dt>
              <span>:</span>
              <dd>{totalDay}</dd>

              <dt>Quantity</dt>
              <span>:</span>
              <dd>{quantity}</dd>

              <dt>Rate</dt>
              <span>:</span>
              <dd>{gear.dailyRate}</dd>

              <dt className="font-semibold">Total Amount</dt>
              <span>:</span>
              <dd className="font-semibold">{totalAmount}</dd>
            </dl>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              form="order-form"
              disabled={isPending || Number(totalAmount) == 0}
            >
              {isPending ? (
                <>
                  Requesting...
                  <Spinner />
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
