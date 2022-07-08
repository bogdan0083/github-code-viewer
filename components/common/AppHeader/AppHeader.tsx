import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  caption?: string;
}

const AppHeader = ({ title, caption }: AppHeaderProps) => {
  const [query, setQuery] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted:", event.currentTarget.search.value);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.currentTarget.value);
    console.log("Changed:", event.currentTarget.value);
  };

  const onSearch = (query: string) => {
    console.log("Searching:", query);
  };

  return (
    <header className="text-center w-full p-4 pt-5 mb-11">
      <h1 className={"font-bold text-4xl"}>{title}</h1>
      {caption && <h2 className={"text-gray-600 mt-1 mb-4"}>{caption}</h2>}
      <SearchForm
        query={query}
        onSubmit={onSubmit}
        onChange={onChange}
        onSearch={onSearch}
      />
    </header>
  );
};
export default AppHeader;
