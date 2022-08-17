import clsx from "clsx";
import styles from "./Topline.module.css";

interface ToplineProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const Topline = ({ left, right, className }: ToplineProps) => {
  const cn = clsx(
    "text-xs flex flex-grow relative justify-between items-center bg-gray-100 border-b border-gray-300 p-2 md:w-[calc(100%+3rem)] md:pr-[3.5rem]",
    className,
    styles.Topline
  );
  return (
    <div className={cn}>
      <div className="flex">{left}</div>
      <div className="flex">{right}</div>
    </div>
  );
};

export default Topline;
