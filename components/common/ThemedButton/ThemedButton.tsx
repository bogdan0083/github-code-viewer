import clsx from "clsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { MouseEventHandler } from "react";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

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
  const paletteMode = usePaletteMode().state.paletteMode;
  const systemPaletteSolidClassName = (
    theme === "primary" &&
    variant === "contained" &&
    paletteMode === PaletteMode.System &&
    "bg-blue-500 hover:bg-blue-600 text-white dark:bg-zinc-800 dark:focus:ring-white dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-700"
  );

  const systemPaletteOutlinedClassName = (
    theme === "primary" &&
    variant === "outlined" &&
    paletteMode === PaletteMode.System &&
    "text-blue-500 border border-blue-500 bg-transparent hover:bg-blue-600 hover:text-white dark:text-inherit dark:border-gray-400 dark:hover:bg-transparent dark:hover:border-white dark:focus:ring-white"
  );

  const cls = clsx(
    "flex justify-center relative items-center rounded focus:ring-2 focus:ring-blue-300 focus:outline-none transition",
    className,
    systemPaletteSolidClassName,
    systemPaletteOutlinedClassName,
    disabled && "cursor-not-allowed opacity-50",
    fullWidth && "w-full",
    size === "xs" && "p-1 px-2 text-xs font-base",
    size === "sm" && "p-2 text-sm",
    size === "md" && "py-2 px-4 text-base font-bold dark:font-medium",
    size === "lg" && "py-4 px-6 text-lg font-bold dark:font-medium"
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
