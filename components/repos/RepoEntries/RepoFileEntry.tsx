import { TreeEntryFieldsFragment } from "../../../__generated__/graphql";
import Link from "next/link";
import { RepoEntrySize, textSizeMap } from "./RepoEntries";
import clsx from "clsx";
import { PaletteMode } from "@lib/context/paletteModeContext";

interface RepoFileEntryProps extends TreeEntryFieldsFragment {
  size: RepoEntrySize;
  selected: boolean;
  href: string;
  paletteMode: PaletteMode;
}

const RepoFileEntry = ({
  oid,
  name,
  size,
  selected,
  href,
  paletteMode,
}: RepoFileEntryProps) => {
  const cls = clsx({
    "flex items-center block py-[1px] px-3 -ml-2 -mr-2 hover:bg-gray-100 focus:text-white focus:bg-blue-400 focus:outline-none":
      true,
    "hover:bg-gray-100 focus:text-white focus:bg-blue-400 dark:hover:bg-inherit dark:hover:text-white dark:focus:!bg-zinc-700":
      paletteMode === PaletteMode.System,
    "!bg-blue-500 focus:!bg-blue-500 !text-white dark:!bg-zinc-700 dark:focus:!bg-zinc-600 dark:text-white":
      selected && paletteMode === PaletteMode.System,
  });

  return (
    <li
      key={oid}
      className={"whitespace-nowrap overflow-ellipsis"}
      data-testid={"RepoEntry"}
    >
      <Link className={textSizeMap[size]} href={href}>
        <a className={cls}>{name}</a>
      </Link>
    </li>
  );
};

export default RepoFileEntry;
