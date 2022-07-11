import clsx from "clsx";

interface ThemedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  theme?: "primary";
  type?: "button" | "submit" | "reset";
}

const ThemedButton = ({
  className,
  children,
  onClick,
  disabled,
  theme = "primary",
  type = "button",
}: ThemedButtonProps) => {
  const cls = clsx(
    "font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none",
    className,
    theme === "primary" && "bg-blue-500 text-white",
    disabled && "cursor-not-allowed opacity-50"
  );

  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default ThemedButton;
