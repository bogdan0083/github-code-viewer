import clsx from "clsx";

interface LangLabelProps {
  color: string | null;
  name: string;
  className?: string;
}

const LangLabel = ({ color, name, className }: LangLabelProps) => {
  return (
    <span
      style={{
        backgroundColor: color || "transparent",
      }}
      className={clsx(
        "inline-block rounded font-medium mr-1 py-1 px-2 text-white rounded",
        className
      )}
    >
      {name}
    </span>
  );
};

export default LangLabel;
