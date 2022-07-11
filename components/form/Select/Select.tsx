import { ChangeEvent } from "react";

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

  return (
    <select onChange={handleChange} multiple={multiple} className={className}>
      {placeholder && <option value="">{placeholder}</option>}
      {renderOptions(options)}
    </select>
  );
};

export default Select;
