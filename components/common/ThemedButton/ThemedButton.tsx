import clsx from "clsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { MouseEventHandler } from "react";

interface ThemedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
  loading = true,
  fullWidth = false,
}: ThemedButtonProps) => {
  const cls = clsx(
    "font-bold flex justify-center relative items-center py-2 px-4 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none transition",
    className,
    theme === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
    disabled && "cursor-not-allowed opacity-50",
    fullWidth && "w-full"
  );

  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type}>
      {loading ? (
        <LoadingSpinner
          wrapperClassName={"absolute"}
          size={"md"}
          theme={"light"}
        />
      ) : null}
      <span className={clsx("flex-grow", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  );
};

export default ThemedButton;
