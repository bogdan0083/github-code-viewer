import SearchForm from "../SearchForm/SearchForm";
import clsx from "clsx";
import Link from "next/link";

interface AppHeaderProps {
  title: string;
  mobileTitle: string;
  fixed?: boolean;
}

const AppHeader = ({ title, mobileTitle, fixed = false }: AppHeaderProps) => {
  const headerClassName = clsx(
    "w-full pt-4 pt-5 bg-white/50 flex items-center px-2 md:px-3",
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
      <div className={""}>
        <h1 className={headingClassName}>
          <Link href={"/"}>
            <a className={"transition-opacity hover:opacity-40"}>
              <span className={"hidden sm:inline"}>{title}</span>
              <span className={"sm:hidden"}>{mobileTitle}</span>
            </a>
          </Link>
        </h1>
      </div>
      <SearchForm className={searchFormClass} />
    </header>
  );
};
export default AppHeader;
