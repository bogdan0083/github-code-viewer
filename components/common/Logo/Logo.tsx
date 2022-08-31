import Link from "next/link";
import LogoSvgIcon from "./LogoSvgIcon";
import clsx from "clsx";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";

interface LogoProps {
  className?: string;
  title: string;
  mobileTitle: string;
}

const Logo = ({ className, title, mobileTitle }: LogoProps) => {
  const [paletteMode] = usePaletteMode();

  return (
    <Link href={"/"}>
      <a
        className={clsx(
          "transition-opacity hover:opacity-40 flex items-center font-bold whitespace-nowrap",
          className,
          paletteMode === PaletteMode.System && "font-bold dark:font-medium"
        )}
      >
        <LogoSvgIcon className={"mr-2"} />
        <span className={"hidden sm:inline"} data-testid="logo-text">
          {title}
        </span>
        <span className={"sm:hidden"}>{mobileTitle}</span>
      </a>
    </Link>
  );
};

export default Logo;
