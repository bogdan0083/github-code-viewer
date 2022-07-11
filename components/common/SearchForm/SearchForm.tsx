import Input from "../../form/Input/Input";
import { ChangeEvent, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import clsx from "clsx";
import ThemedButton from "../ThemedButton/ThemedButton";

interface SearchFormProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  query?: string;
  debounceDelay?: number;
  className?: string;
}

const SearchForm = ({
  onChange,
  onSearch,
  query = "",
  debounceDelay = 300,
  className,
}: SearchFormProps) => {
  const debouncedOnSearch = useMemo(() => {
    return debounce((q) => {
      onSearch(q);
    }, debounceDelay);
  }, [debounceDelay, onSearch]);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      debouncedOnSearch(e.currentTarget.value);
    },
    [debouncedOnSearch, onChange]
  );

  const cls = clsx("w-full max-w-lg mx-auto", className);

  return (
    <form className={cls} onSubmit={(e) => onSearch(e.currentTarget.value)}>
      <Input
        type="search"
        name="search"
        placeholder="Start typing..."
        value={query}
        onChange={(e) => onChangeHandler(e)}
      />
      <ThemedButton type="submit" className="ml-2" disabled={query === ""}>
        Search
      </ThemedButton>
    </form>
  );
};

export default SearchForm;
