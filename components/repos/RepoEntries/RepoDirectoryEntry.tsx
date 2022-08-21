import { TreeEntryFieldsFragment } from "../../../generated/graphql";
import Link from "next/link";
import { IoFolder, IoFolderOpen } from "react-icons/io5";
import { iconSizeMap, RepoEntrySize, textSizeMap } from "./RepoEntries";
import clsx from "clsx";

interface RepoDirectoryEntryProps
  extends Omit<TreeEntryFieldsFragment, "type"> {
  size: RepoEntrySize;
  selected: boolean;
  href: string;
}

const RepoDirectoryEntry = ({
  oid,
  name,
  size,
  selected = false,
  href,
}: RepoDirectoryEntryProps) => {
  const cls = clsx(
    "flex items-center block py-[1px] px-3 -ml-2 -mr-2 hover:bg-gray-100 focus:text-white focus:bg-blue-400 focus:outline-none",
    selected && "!bg-blue-500 !focus:bg-blue-500 !text-white"
  );

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
