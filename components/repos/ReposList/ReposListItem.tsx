import { Repo } from "../../../models/repo";
import Link from "next/link";
import LangLabel from "../LangLabel/LangLabel";

interface ReposListProps extends Repo {}

const ReposListItem = ({
  id,
  nameWithOwner,
  description,
  forkCount,
  stargazerCount,
  primaryLanguage,
}: ReposListProps) => {
  return (
    <div
      key={id}
      className={
        "mb-1 rounded border border-gray-200 p-3 mb-3 shadow last:mb-0"
      }
    >
      <Link href={`/${nameWithOwner}`}>
        <a className={"font-bold text-xl mb-1 block"}>{nameWithOwner}</a>
      </Link>
      <p className={"text-sm text-gray-500"}>{description}</p>
      <div className="mt-3">
        {primaryLanguage && <LangLabel {...primaryLanguage} />}
        {forkCount && (
          <span className={"ml-2 text-xs text-gray-500"}>
            {forkCount} forks
          </span>
        )}
        {stargazerCount && (
          <span className={"ml-2 text-xs text-gray-500"}>
            {stargazerCount} stars
          </span>
        )}
      </div>
    </div>
  );
};

export default ReposListItem;
