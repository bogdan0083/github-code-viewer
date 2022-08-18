import clsx from "clsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { MouseEventHandler } from "react";

interface ThemedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  theme?: "primary" | "neutral";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "contained" | "outlined" | "text";
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
  size = "md",
  variant = "contained",
}: ThemedButtonProps) => {
  const cls = clsx(
    "flex justify-center relative items-center rounded focus:ring-2 focus:ring-blue-300 focus:outline-none transition",
    className,
    theme === "primary" &&
      variant === "contained" &&
      "bg-blue-500 hover:bg-blue-600 text-white",
    theme === "primary" &&
      variant === "outlined" &&
      "text-blue-500 border border-blue-500 bg-transparent hover:bg-blue-600 hover:text-white",
    disabled && "cursor-not-allowed opacity-50",
    fullWidth && "w-full",
    size === "xs" && "p-1 px-2 text-xs font-base",
    size === "sm" && "p-2 text-sm",
    size === "md" && "py-2 px-4 text-base font-bold",
    size === "lg" && "py-4 px-6 text-lg font-bold"
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
