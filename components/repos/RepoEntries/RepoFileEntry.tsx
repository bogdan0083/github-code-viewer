import { TreeEntryFieldsFragment } from "../../../generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { RepoEntrySize, textSizeMap } from "./RepoEntries";

interface RepoFileEntryProps extends TreeEntryFieldsFragment {
  size: RepoEntrySize;
}

const RepoFileEntry = ({ oid, name, path, size }: RepoFileEntryProps) => {
  const router = useRouter();
  const owner = router.query.owner as string;
  const ownerName = router.query.name as string;

  const href = `/${owner}/${ownerName}/${path}`;

  return (
    <li key={oid}>
      <Link className={textSizeMap[size]} href={href}>
        <a
          className={
            "flex items-center block py-[1px] -ml-2 -mr-2 px-3 hover:bg-gray-100 focus:text-white focus:bg-blue-600 focus:outline-none"
          }
        >
          {name}
        </a>
      </Link>
    </li>
  );
};

export default RepoFileEntry;
