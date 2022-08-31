import {PaletteMode, usePaletteMode} from "@lib/context/paletteModeContext";
import clsx from "clsx";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Input = (
  props: InputHTMLAttributes<HTMLInputElement> & InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const paletteMode = usePaletteMode().state.paletteMode;
  const {
    type = "text",
    name,
    placeholder,
    className,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    onClick,
    value,
    ...otherProps
  } = props;
  const cl = clsx(
    "py-2 px-2 w-full border text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    className,
    paletteMode === PaletteMode.System && "bg-white border-gray-300 dark:bg-zinc-900 dark:border-gray-700 dark:focus:ring-white"
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
      ref={ref}
      {...otherProps}
    />
  );
};

export default forwardRef(Input);
