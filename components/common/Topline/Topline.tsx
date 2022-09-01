import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";
import clsx from "clsx";

interface ToplineProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const Topline = ({ left, right, className }: ToplineProps) => {
  const [paletteMode] = usePaletteMode();
  const cn = clsx({
    "text-xs flex flex-grow relative justify-between items-center border-b p-2":
      true,
    [className || ""]: true,
    "bg-gray-100 border-gray-300 dark:bg-zinc-900 dark:border-gray-800":
      paletteMode === PaletteMode.System,
  });
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
