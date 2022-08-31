import { AiFillHeart } from "react-icons/ai";
import clsx from "clsx";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

interface AppFooterProps {
  className?: string;
}

const Me = ({ paletteMode }: { paletteMode: PaletteMode }) => {
  return (
    <a
      target={"_blank"}
      href={"https://github.com/bogdan0083"}
      rel="noreferrer"
      className={clsx({
        "transition-opacity transition-colors": true,
        "hover:opacity-75 dark:hover:opacity-100 dark:hover:text-white":
          paletteMode === PaletteMode.System,
      })}
    >
      Bogdan Dolin
    </a>
  );
};

const AppFooter = ({ className }: AppFooterProps) => {
  const paletteMode = usePaletteMode().state.paletteMode;
  return (
    <footer
      className={clsx(
        "border-t mt-6 text-sm",
        className,
        paletteMode === PaletteMode.System &&
          "border-gray-300 text-gray-600 dark:border-gray-800 dark:text-gray-400"
      )}
      data-testid={"footer"}
    >
      <div className="container mx-auto py-3 px-2">
        <div className="flex justify-center items-center">
          Made with&nbsp;
          <AiFillHeart className={"text-red-500"} />
          &nbsp;by&nbsp;
          <Me paletteMode={paletteMode} />
        </div>
        <div className="flex justify-center items-center text-xs mt-1">
          The source code is available on&nbsp;
          <a
            target={"_blank"}
            href={"https://github.com/bogdan0083/github-code-viewer"}
            rel={"noreferrer"}
            className={clsx({
              "transition-opacity transition-colors": true,
              "hover:opacity-75 dark:hover:opacity-100 dark:hover:text-white":
                paletteMode === PaletteMode.System,
            })}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
