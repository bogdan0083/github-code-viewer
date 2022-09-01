import SearchForm from "../SearchForm/SearchForm";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

interface AppHeaderProps {
  fixed?: boolean;
}

const AppHeader = ({ fixed = false }: AppHeaderProps) => {
  const [paletteMode] = usePaletteMode();

  const headerClassName = clsx(
    "w-full pt-4 pt-5 flex items-center px-2 md:px-3",
    fixed &&
      "h-[length:var(--header-height)] sticky top-0 left-0 right-0 z-10 blur-1 pt-2 pb-2 backdrop-blur-md border-b ",
    !fixed && "text-center",
    paletteMode === PaletteMode.System &&
      "bg-white/50 border-gray-200 dark:border-gray-800 dark:bg-transparent"
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
