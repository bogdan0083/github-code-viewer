import { TreeEntryFieldsFragment } from "../../../__generated__/graphql";
import Link from "next/link";
import { IoFolder, IoFolderOpen } from "react-icons/io5";
import { iconSizeMap, RepoEntrySize, textSizeMap } from "./RepoEntries";
import clsx from "clsx";
import {PaletteMode, usePaletteMode} from "@lib/context/paletteModeContext";

interface RepoDirectoryEntryProps
  extends Omit<TreeEntryFieldsFragment, "type"> {
  size: RepoEntrySize;
  selected: boolean;
  href: string;
  paletteMode: PaletteMode;
}

const RepoDirectoryEntry = ({
  oid,
  name,
  size,
  selected = false,
  href,
}: RepoDirectoryEntryProps) => {
  const paletteMode = usePaletteMode().state.paletteMode;
  const cls = clsx({
    "flex items-center block py-[1px] px-3 -ml-2 -mr-2 hover:bg-gray-100 focus:text-white focus:bg-blue-400 focus:outline-none":
      true,
    "hover:bg-gray-100 focus:text-white focus:bg-blue-400 dark:hover:bg-inherit dark:hover:text-white dark:focus:!bg-zinc-700": paletteMode === PaletteMode.System,
    "!bg-blue-500 !focus:bg-blue-500 !text-white dark:!bg-zinc-700 dark:focus:bg-zinc-700 dark:text-white": selected && (paletteMode === PaletteMode.System),
  });

  return (
    <li key={oid} data-testid={"RepoEntry"}>
      <Link className={textSizeMap[size]} href={href}>
        <a className={cls}>
          {selected ? (
            <IoFolderOpen size={iconSizeMap[size]} className={"mr-1"} />
          ) : (
            <IoFolder size={iconSizeMap[size]} className={"mr-1"} />
          )}
          {name}
        </a>
      </Link>
    </li>
  );
};

export default RepoDirectoryEntry;
