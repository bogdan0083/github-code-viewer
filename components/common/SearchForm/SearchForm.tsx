import clsx from "clsx";
import ThemedButton from "../ThemedButton/ThemedButton";
import {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from "react";
import debounce from "lodash.debounce";
import {
  RepoFieldsFragment,
  SearchType,
  useSearchQuery,
} from "../../../__generated__/graphql";
import Input from "../../form/Input/Input";
import Autocomplete from "../Autocomplete/Autocomplete";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import {PaletteMode, usePaletteMode} from "@lib/context/paletteModeContext";

interface SearchFormProps {
  className?: string;
}

interface ListOptionAdditionalProps {
  focused?: boolean;
  paletteMode: PaletteMode;
}

const ListOption = ({
  owner,
  id,
  nameWithOwner,
  name,
  description,
  defaultBranchRef,
  primaryLanguage,
  forkCount,
  stargazerCount,
  focused,
  __typename,
  paletteMode,
  ...other
}: HTMLAttributes<HTMLLIElement> &
  RepoFieldsFragment &
  ListOptionAdditionalProps) => {
  const itemClassName = clsx(
    "w-full cursor-pointer group",
    focused && paletteMode === PaletteMode.System && "bg-blue-600 text-white dark:bg-zinc-800",
  );
  const linkClassName = clsx(
    "block transition-colors px-2 pt-1 sm:px-3 sm:pt-2 pb-3",
    paletteMode === PaletteMode.System && "hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-white",
    focused && paletteMode === PaletteMode.System && "hover:bg-blue-700 dark:hover:bg-zinc-700"
  );
  const descriptionClassName = clsx(
    "text-xs",
    paletteMode === PaletteMode.System && "text-gray-500 dark:group-hover:text-inherit",
    focused && "text-inherit"
  );
  return (
    <li {...other} className={itemClassName}>
      <a className={linkClassName} data-testid={"SearchResultsItem"}>
        <span className={"text-sm"}>{nameWithOwner}</span>
        <p className={descriptionClassName}>{description}</p>
      </a>
    </li>
  );
};

const SearchForm = ({ className }: SearchFormProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean | undefined>(undefined);
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined);
  const [paletteMode] = usePaletteMode();

  const [result] = useSearchQuery({
    pause: !isLoading || isSelected,
    variables: {
      query: query,
      type: SearchType.Repository,
      limit: 5,
    },
  });

  const { data, error, fetching } = result;

  const handleDebounceChange = useMemo(
    () =>
      debounce((_, value) => {
        if (!isSelected) {
          setIsLoading(true);
          setQuery(value);
        }
      }, 300),
    [isSelected]
  );

  const handleSelect = useCallback<any>(
    (e: ChangeEvent, option: RepoFieldsFragment) => {
      setIsSelected(true);
      const href = `/${encodeURIComponent(
        option.owner.login
      )}/${encodeURIComponent(option.name)}/blob/${
        option.defaultBranchRef?.name
      }/README.md`;

      router.push(href);
    },
    [router]
  );
  if (error) {
    throw error;
  }

  const cls = clsx("w-full mx-auto", className);

  return (
    <form className={cls} onSubmit={() => null} data-testid={"SearchForm"}>
      <div className={"relative flex flex-grow items-center"}>
        <Autocomplete
          renderInput={(params) => (
            <Input
              {...params}
              placeholder="Search repos..."
              data-testid={"SearchInput"}
            />
          )}
          options={(data?.search.nodes as RepoFieldsFragment[]) || []}
          onInputChange={handleDebounceChange}
          getOptionLabel={(o) => (typeof o === "string" ? o : o.nameWithOwner)}
          filterOptions={(o) => o}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          filterSelectedOptions={false}
          freeSolo={true}
          openOnFocus={true}
          id={"Header Search"}
          clearOnBlur={false}
          onChange={handleSelect}
          multiple={false}
          onHighlightChange={(e, option, reason) =>
            reason === "keyboard" &&
            setFocusedId(option ? option.id : undefined)
          }
          renderOption={(props, option: RepoFieldsFragment) => (
            <ListOption
              {...props}
              {...option}
              paletteMode={paletteMode}
              focused={focusedId === option.id}
            />
          )}
          className="flex flex-grow items-center"
          isLoading={fetching}
        />
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
      </div>
    </form>
  );
};

export default SearchForm;
