import { TreeEntryFieldsFragment } from "../../../generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { RepoEntrySize, textSizeMap } from "./RepoEntries";
import clsx from "clsx";

interface RepoFileEntryProps extends TreeEntryFieldsFragment {
  size: RepoEntrySize;
  selected: boolean;
}

const RepoFileEntry = ({
  oid,
  name,
  path,
  size,
  selected,
}: RepoFileEntryProps) => {
  const router = useRouter();
  const owner = router.query.owner as string;
  const ownerName = router.query.name as string;
  const routePath = [...(router.query.path as string[]), name];
  const entryType = routePath[0];
  const branchName = routePath[1];

  let slicedPath = routePath.slice(2);

  const href = `/${owner}/${ownerName}/blob/${branchName}/${slicedPath.join(
    "/"
  )}`;

  const cls = clsx(
    "flex items-center block py-[1px] px-3 -ml-2 -mr-2 hover:bg-gray-100 focus:text-white focus:bg-blue-400 focus:outline-none",
    selected && "!bg-blue-500 !focus:bg-blue-500 !text-white"
  );

  return (
    <li key={oid} className={"whitespace-nowrap overflow-ellipsis"}>
      <Link className={textSizeMap[size]} href={href}>
        <a className={cls}>{name}</a>
      </Link>
    </li>
  );
};

export default RepoFileEntry;
