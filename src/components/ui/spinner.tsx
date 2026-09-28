import { cn } from "@/lib/utils"
import { Loader, LoaderIcon } from "lucide-react"


function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }



function SpacedSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}


export { SpacedSpinner };
const FullDisplayLoader = ({
  loadingText = "Loading...",
}: {
  loadingText?: string;
}) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col gap-2  items-center justify-center bg-black/40 ">
      <SpacedSpinner className="h-10 w-10" />
      <p className="text-gray-300">{loadingText}</p>
    </div>
  );
};

export default FullDisplayLoader;