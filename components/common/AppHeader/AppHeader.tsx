import SearchForm from "../SearchForm/SearchForm";
import { ChangeEvent, useState } from "react";
import clsx from "clsx";

interface AppHeaderProps {
  title: string;
  caption?: string;
  fixed?: boolean;
}

const AppHeader = ({ title, caption, fixed = false }: AppHeaderProps) => {
  const [query, setQuery] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.currentTarget.value);
    console.log("Changed:", event.currentTarget.value);
  };

  const onSearch = (query: string) => {
    console.log("Searching:", query);
  };

  const headerClassName = clsx(
    "w-full pt-4 pt-5 mb-11 bg-white/50",
    fixed &&
      "sticky top-0 left-0 right-0 z-10 blur-1 pt-2 pb-2 backdrop-blur-md mb-8",
    !fixed && "text-center"
  );

  const containerClassName = clsx(
    "container mx-auto",
    fixed && "flex items-center"
  );

  const searchFormClass = clsx("flex mt-4", fixed && "mt-0 max-w-none ml-6");

  const headingClassName = clsx(
    "font-bold",
    fixed && "text-base whitespace-nowrap"
  );

  const captionClassName = clsx(
    "text-gray-600 mt-1",
    fixed && "text-xs whitespace-nowrap mt-0"
  );

  return (
    <header className={headerClassName}>
      <div className={containerClassName}>
        <div>
          <h1 className={headingClassName}>{title}</h1>
          {caption && <h2 className={captionClassName}>{caption}</h2>}
        </div>
        <SearchForm
          query={query}
          onChange={onChange}
          onSearch={onSearch}
          className={searchFormClass}
        />
      </div>
    </header>
  );
};
export default AppHeader;
