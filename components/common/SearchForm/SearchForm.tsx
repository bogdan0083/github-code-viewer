import { ChangeEvent, useCallback, useState } from "react";
import clsx from "clsx";
import ThemedButton from "../ThemedButton/ThemedButton";
import debounce from "lodash.debounce";
import {
  RepoFieldsFragment,
  SearchType,
  useSearchQuery,
} from "../../../generated/graphql";
import Input from "../../form/Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Link from "next/link";

interface SearchFormProps {
  debounceDelay?: number;
  className?: string;
}

const SearchForm = ({ debounceDelay = 600, className }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [result] = useSearchQuery({
    pause: !isSearching,
    variables: {
      query: query,
      type: SearchType.Repository,
      limit: 5,
    },
  });

  const { data, error, fetching } = result;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
    if (!event.currentTarget.value) {
      setIsSearching(false);
      setDropdownOpen(false);
    }
    onSearchHandler(event.currentTarget.value);
  };

  const onSearchHandler = debounce((query: string) => {
    if (query) {
      setIsSearching(true);
      setDropdownOpen(true);
    } else {
      setIsSearching(false);
    }
  }, debounceDelay);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  const cls = clsx("w-full mx-auto", className);

  return (
    <form className={cls} onSubmit={() => console.log("onSubmit")}>
      <div className={"relative flex flex-grow"}>
        <Input
          type="search"
          name="search"
          placeholder="Search code"
          value={query}
          className={"flex-grow"}
          onChange={onChangeHandler}
          onFocus={() => data && setDropdownOpen(true)}
        />
        <Dropdown
          isOpen={isDropdownOpen}
          items={data ? data.search.nodes : undefined}
          isLoading={fetching}
          onClickOutside={closeDropdown}
          renderItem={(item: RepoFieldsFragment) => (
            <Link href={item.nameWithOwner} key={item.id}>
              <a className={"block hover:bg-gray-200 hover:bg-gray-300 p-3"}>
                <span className={"text-sm"}>{item.nameWithOwner}</span>
                <p className={"text-xs text-gray-500"}>{item.description}</p>
              </a>
            </Link>
          )}
        />
      </div>
      <ThemedButton type="submit" className="ml-2" disabled={query === ""}>
        Search
      </ThemedButton>
    </form>
  );
};

export default SearchForm;
