import clsx from "clsx";

interface ToplineProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const Topline = ({ left, right, className }: ToplineProps) => {
  const cn = clsx(
    "text-xs flex flex-grow relative justify-between items-center bg-gray-100 border-b border-gray-300 p-2",
    className
  );
  return (
    <div data-testid={"Topline"}>
      <div className={cn}>
        <div className="flex">{left}</div>
        <div className="flex">{right}</div>
      </div>
    </div>
  );
};

export default Topline;
