import { TreeEntryFieldsFragment } from "../../../generated/graphql";
import Link from "next/link";
import { IoFolder } from "react-icons/io5";
import { useRouter } from "next/router";
import { iconSizeMap, RepoEntrySize, textSizeMap } from "./RepoEntries";

interface RepoDirectoryEntryProps extends TreeEntryFieldsFragment {
  size: RepoEntrySize;
}

const RepoDirectoryEntry = ({
  path,
  oid,
  name,
  size,
}: RepoDirectoryEntryProps) => {
  const router = useRouter();
  const owner = router.query.owner as string;
  const ownerName = router.query.name as string;

  const href = `/${owner}/${ownerName}/${path}`;

  return (
    <li key={oid}>
      <Link className={textSizeMap[size]} href={href}>
        <a
          className={
            "flex items-center block py-[1px] px-3 -ml-2 -mr-2 hover:bg-gray-100 focus:text-white focus:bg-blue-600 focus:outline-none"
          }
        >
          <IoFolder size={iconSizeMap[size]} className={"mr-1"} />
          {name}
        </a>
      </Link>
    </li>
  );
};

export default RepoDirectoryEntry;
