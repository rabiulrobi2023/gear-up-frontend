import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface IActionButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const ActionButton = ({
  loading = false,
  loadingText = "Processing...",
  children,
  disabled,
  ...props
}: IActionButtonProps) => {
  return (
    <Button {...props} disabled={disabled || loading}>
      {loading ? (
        <span className="flex items-center gap-2">
          {loadingText} <Spinner />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default ActionButton;
