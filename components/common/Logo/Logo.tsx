import Link from "next/link";
import LogoSvgIcon from "./LogoSvgIcon";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  title: string;
  mobileTitle: string;
}

const Logo = ({ className, title, mobileTitle }: LogoProps) => {
  return (
    <Link href={"/"}>
      <a
        className={clsx(
          "transition-opacity hover:opacity-40 flex items-center font-bold whitespace-nowrap",
          className
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
