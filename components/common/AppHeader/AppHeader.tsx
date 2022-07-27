import SearchForm from "../SearchForm/SearchForm";
import clsx from "clsx";

interface AppHeaderProps {
  title: string;
  fixed?: boolean;
}

const AppHeader = ({ title, fixed = false }: AppHeaderProps) => {
  const headerClassName = clsx(
    "w-full pt-4 pt-5 bg-white/50 flex items-center px-2",
    fixed &&
      "h-[length:var(--header-height)] sticky top-0 left-0 right-0 z-10 blur-1 pt-2 pb-2 backdrop-blur-md border-b border-gray-200",
    !fixed && "text-center"
  );

  const searchFormClass = clsx("flex mt-4", fixed && "mt-0 ml-6");

  const headingClassName = clsx(
    "font-bold",
    fixed && "text-base whitespace-nowrap"
  );

  return (
    <header className={headerClassName}>
      <div>
        <h1 className={headingClassName}>{title}</h1>
      </div>
      <SearchForm className={searchFormClass} />
    </header>
  );
};
export default AppHeader;

