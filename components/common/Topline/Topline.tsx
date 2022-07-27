import clsx from "clsx";

interface ToplineProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Topline = ({ left, right, className }: ToplineProps) => {
  const cn = clsx(
    "bg-gray-100 border-b border-gray-300 text-xs flex justify-between items-center p-2",
    className
  );
  return (
    <div className={cn}>
      <div className="flex">{left}</div>
      <div className="flex">{right}</div>
    </div>
  );
};

export default Topline;
