import SearchForm from "../SearchForm/SearchForm";
import clsx from "clsx";
import Logo from "../Logo/Logo";

interface AppHeaderProps {
  fixed?: boolean;
}

const AppHeader = ({ fixed = false }: AppHeaderProps) => {
  const headerClassName = clsx(
    "w-full pt-4 pt-5 bg-white/50 flex items-center px-2 md:px-3",
    fixed &&
      "h-[length:var(--header-height)] sticky top-0 left-0 right-0 z-10 blur-1 pt-2 pb-2 backdrop-blur-md border-b border-gray-200",
    !fixed && "text-center"
  );

  const searchFormClass = clsx("flex mt-4", fixed && "mt-0 ml-6");

  return (
    <header className={headerClassName} data-testid={"header"}>
      <Logo
        title={"Github Code Viewer"}
        mobileTitle={"GCV"}
        className={"flex-shrink-0"}
      />
      <SearchForm className={searchFormClass} />
    </header>
  );
};
export default AppHeader;
