import { Repo } from "../../../models/repo";
import Link from "next/link";
import LangLabel from "../../common/LangLabel/LangLabel";

interface ReposListProps extends Repo {}

const ReposListItem = ({
  id,
  nameWithOwner,
  description,
  forkCount,
  stargazerCount,
  languages,
}: ReposListProps) => {
  const primaryLang = languages.nodes[0];
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
        {primaryLang && <LangLabel {...primaryLang} />}
        <span className={"ml-2 text-xs text-gray-500"}>{forkCount} forks</span>
        <span className={"ml-2 text-xs text-gray-500"}>
          {stargazerCount} stars
        </span>
      </div>
    </div>
  );
};

export default ReposListItem;
