import { ChangeEvent } from "react";
import clsx from "clsx";
import styles from "./Select.module.css";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

type Rec = Record<string, string>;
type SelectOptions = Record<string, string | Rec>;

interface SelectProps {
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  options: SelectOptions;
  placeholder?: string;
  className?: string;
}

const Select = (props: SelectProps) => {
  const {
    onChange,
    multiple,
    options,
    placeholder,
    className,
    ...otherProps
  }: SelectProps = props;
  const paletteMode = usePaletteMode().state.paletteMode;
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const values = [...e.target.options]
        .filter((option) => option.selected)
        .map((option) => option.value);
      onChange(values);
    } else {
      const { value } = e.target;
      onChange([value]);
    }
  };

  const renderOptions = (
    opts: SelectOptions
  ): (JSX.Element | JSX.Element[])[] => {
    const optionsList = Object.entries(opts);
    return optionsList.map(([key, value]) => {
      if (typeof value === "string") {
        return (
          <option key={key} value={key}>
            {value}
          </option>
        );
      } else {
        return (
          <optgroup key={key} label={key}>
            {renderOptions(value)}
          </optgroup>
        );
      }
    });
  };

  const selectClassName = clsx(
    styles.select,
    "border text-sm rounded-lg block w-full p-2.5",
    className,
    paletteMode === PaletteMode.System &&
      "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-9 focus:border-blue-500 dark:focus:border-blue-500 dark:bg-zinc-900 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-white dark:focus:border-transparent"
  );

  return (
    <select
      onChange={handleChange}
      multiple={multiple}
      className={selectClassName}
      {...otherProps}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {renderOptions(options)}
    </select>
  );
};

export default Select;
