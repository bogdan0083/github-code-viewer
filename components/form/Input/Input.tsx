import clsx from "clsx";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  className,
  onChange,
  onKeyDown,
  onKeyUp,
  onFocus,
  onBlur,
  onClick,
}: InputProps) => {
  const cl = clsx(
    "py-2 px-3 w-full border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    className
  );
  return (
    <input
      className={cl}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    />
  );
};

export default Input;
