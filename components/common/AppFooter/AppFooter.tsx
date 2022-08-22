import { AiFillHeart } from "react-icons/ai";
import clsx from "clsx";

interface AppFooterProps {
  className?: string;
}

const Me = () => {
  return (
    <a
      target={"_blank"}
      href={"https://github.com/bogdan0083"}
      rel="noreferrer"
      className={"transition-opacity hover:opacity-75"}
    >
      Bogdan Dolin
    </a>
  );
};

const AppFooter = ({ className }: AppFooterProps) => {
  return (
    <footer
      className={clsx(
        "border-t border-gray-300 text-gray-600 mt-6 text-sm",
        className
      )}
      data-testid={"footer"}
    >
      <div className="container mx-auto py-3 px-2">
        <div className="flex justify-center items-center">
          Made with&nbsp;
          <AiFillHeart className={"text-red-500"} />
          &nbsp;by&nbsp;
          <Me />
        </div>
        <div className="flex justify-center items-center text-xs mt-1">
          The source code is available on&nbsp;
          <a
            target={"_blank"}
            href={"https://github.com/bogdan0083/github-code-viewer"}
            rel={"noreferrer"}
            className={"transition-opacity hover:opacity-75"}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
