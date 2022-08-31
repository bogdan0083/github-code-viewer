import AppHeader from "../common/AppHeader/AppHeader";
import clsx from "clsx";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import { useRouter } from "next/router";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

interface LayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

const SidenavLayout = ({ children, sideNavContent }: LayoutProps) => {
  const [paletteMode] = usePaletteMode();
  const router = useRouter();
  const wrapperClassName = "flex flex-col flex-grow md:flex-row md:h-[calc(100vh-var(--header-height))]";
  const sidenavWrapperClassName = clsx(
    {
      "flex-col flex-shrink-0 md:w-3/12 md:h-full overflow-auto hidden md:flex": true,
      "md:border-r border-gray-300 dark:border-gray-800": paletteMode === PaletteMode.System
    }
  );
  return (
    <>
      <AppHeader fixed />
      <main className={wrapperClassName}>
        <ErrorBoundary router={router}>
          <div className={sidenavWrapperClassName}>{sideNavContent}</div>
          <div className="flex-grow md:max-h-full overflow-auto">
            {children}
          </div>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default SidenavLayout;
