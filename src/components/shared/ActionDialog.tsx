"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/ui/spinner";
import { ComponentProps, useState } from "react";

interface IActionDialogProps {
  triggerBtn: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  actionBtnText?: string;
  actionBtnProps?: ComponentProps<typeof AlertDialogAction>;
  loadingText?: string;
  loading?: boolean;
  onAction: () => Promise<void>;
}

export function ActionDialog({
  triggerBtn,
  dialogTitle = "Are you absolutely sure?",
  dialogDescription = "Are you sure you want to continue? This action cannot be undone.",
  actionBtnText = "Continue",
  actionBtnProps,
  loadingText = "Processing...",
  loading = false,
  onAction,
}: IActionDialogProps) {
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    try {
      await onAction();
      setOpen(false);
    } catch {}
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={loading}>
        {triggerBtn}
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>

          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-row justify-end">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleAction();
            }}
            disabled={loading}
            {...actionBtnProps}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner />
                {loadingText}
              </span>
            ) : (
              actionBtnText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
