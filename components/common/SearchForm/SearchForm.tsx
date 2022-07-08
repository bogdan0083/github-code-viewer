import Input from "../../form/Input/Input";
import { ChangeEvent, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

interface SearchFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  query?: string;
  debounceDelay?: number;
}

const SearchForm = ({
  onSubmit,
  onChange,
  onSearch,
  query = "",
  debounceDelay = 300,
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

  return (
    <form className="w-full max-w-lg mx-auto" onSubmit={onSubmit}>
      <Input
        type="search"
        name="search"
        placeholder="Start typing..."
        value={query}
        onChange={(e) => onChangeHandler(e)}
      />
    </form>
  );
};

export default SearchForm;
