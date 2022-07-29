import { ChangeEvent } from "react";
import clsx from "clsx";
import styles from "./Select.module.css";

type Rec = Record<string, string>;
type SelectOptions = Record<string, string | Rec>;

interface SelectProps {
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  options: SelectOptions;
  placeholder?: string;
  className?: string;
}

const Select = ({
  onChange,
  multiple,
  options,
  placeholder,
  className,
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const values = [...e.target.options]
        .filter((option) => option.selected)
        .map((option) => option.value);
      onChange(values);
    } else {
      const { value } = e.target;
      console.log(value);
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
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    className
  );

  return (
    <select
      onChange={handleChange}
      multiple={multiple}
      className={selectClassName}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {renderOptions(options)}
    </select>
  );
};

export default Select;
