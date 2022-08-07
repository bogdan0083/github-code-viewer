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
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";

interface SearchFormProps {
  debounceDelay?: number;
  className?: string;
}

const SearchForm = ({ debounceDelay = 600, className }: SearchFormProps) => {
  const router = useRouter();
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
          placeholder="Search repos"
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
            <Link
              href={`/${encodeURIComponent(
                item.owner.login
              )}/${encodeURIComponent(item.name)}/tree/${
                item.defaultBranchRef?.name
              }`}
              key={item.id}
            >
              <a
                className={
                  "block hover:bg-gray-200 hover:bg-gray-300 px-2 pt-1 sm:px-3 sm:pt-2 pb-3"
                }
              >
                <span className={"text-sm"}>{item.nameWithOwner}</span>
                <p className={"text-xs text-gray-500"}>{item.description}</p>
              </a>
            </Link>
          )}
        />
      </div>
      <ThemedButton
        type="submit"
        className="ml-2 w-10 h-10"
        disabled={query === ""}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/search/?q=${encodeURIComponent(query)}`);
        }}
      >
        <IoSearch size={22} />
      </ThemedButton>
    </form>
  );
};

export default SearchForm;
