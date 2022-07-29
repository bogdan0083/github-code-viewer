import clsx from "clsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ThemedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  theme?: "primary";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
}

const ThemedButton = ({
  className,
  children,
  onClick,
  disabled,
  theme = "primary",
  type = "button",
  loading = false,
  fullWidth = false,
}: ThemedButtonProps) => {
  const cls = clsx(
    "font-bold flex justify-center relative items-center py-2 px-4 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none",
    className,
    theme === "primary" && "bg-blue-500 text-white",
    disabled && "cursor-not-allowed opacity-50",
    fullWidth && "w-full"
  );

  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type}>
      {loading ? (
        <LoadingSpinner wrapperClassName={"absolute"} size={"md"} />
      ) : null}
      <span className={clsx("flex-grow", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
};

export default ThemedButton;
