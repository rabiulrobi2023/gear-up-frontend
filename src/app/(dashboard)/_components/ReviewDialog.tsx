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

import { Controller, useForm } from "react-hook-form";
import { useActionState, useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { IReviewFormValue } from "@/interface/review.interface";
import { reviewSchema } from "@/validation/reviewSchema";

import { toast } from "sonner";
import RequiredLabel from "@/components/shared/RequiredLabel";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { leaveReview } from "../_actions/leaveReview";

export function ReviewDialog({
  itemId,
  orderId,
}: {
  itemId: string;
  orderId: string;
}) {
  const router = useRouter();

  const form = useForm<IReviewFormValue>({
    resolver: zodResolver(reviewSchema),
    mode: "all",
    defaultValues: {
      rating: 1,
      comment: "",
    },
  });

  const [open, setOpen] = useState(false);

  const comment = form.watch("comment")?.toString();

  const [state, formAction] = useActionState(leaveReview, null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: IReviewFormValue) => {
    const formData = new FormData();

    formData.append("itemId", itemId);
    formData.append("orderId", orderId);
    formData.append("rating", values.rating.toString());
    formData.append("comment", values.comment);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Leave reviewed successfully");
      form.reset();
      setOpen(false);
      router.refresh();
    } else {
      toast.error(state.message || "Reviewed failed");
    }
  }, [state, router, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Review</Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="review-form"
          className="space-y-5"
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Leave Review
            </DialogTitle>
            <DialogDescription>
              Leave review. Click submit when you&apos;re done. Otherwise click
              on cancel.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="">
            {/* Rating */}
            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="rating">Rating</RequiredLabel>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        variant="ghost"
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        size="lg"
                        className="hover:bg-transparent"
                      >
                        <Star
                          className={cn(
                            star <= field.value &&
                              "fill-yellow-400 text-yellow-400",
                            "text-muted-foreground size-10",
                          )}
                        />
                      </Button>
                    ))}
                  </div>

                  {fieldState.error && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            {/* Comment */}
            <Controller
              name="comment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <RequiredLabel htmlFor="comment">Comment</RequiredLabel>
                  <Textarea
                    id="comment"
                    {...field}
                    placeholder="Write your comment"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="review-form"
              disabled={isPending || comment?.length < 5}
            >
              {isPending ? (
                <>
                  Submitting...
                  <Spinner />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
