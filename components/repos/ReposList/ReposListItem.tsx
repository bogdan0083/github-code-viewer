import Link from "next/link";
import LangLabel from "../../common/LangLabel/LangLabel";
import { RepoFieldsFragment } from "../../../generated/graphql";

interface ReposListProps extends RepoFieldsFragment {}

const ReposListItem = ({
  id,
  nameWithOwner,
  name,
  owner,
  description,
  forkCount,
  stargazerCount,
  primaryLanguage = null,
}: ReposListProps) => {
  return (
    <div
      key={id}
      className={
        "mb-1 rounded border border-gray-200 p-3 mb-3 shadow last:mb-0"
      }
    >
      <Link href={`/${nameWithOwner}`}>
        <a className={"font-bold lg:text-xl block mb-1"}>
          <span>{name}</span>/
          <span className={"inline-block"}>{owner.login}</span>
        </a>
      </Link>
      <p className={"text-xs lg:text-sm text-gray-500"}>{description}</p>
      <div className="mt-3">
        {primaryLanguage && (
          <LangLabel
            name={primaryLanguage.name}
            color={primaryLanguage?.color || null}
            className={"text-xs"}
          />
        )}
        <span className={"ml-2 text-xs text-gray-500"}>{forkCount} forks</span>
        <span className={"ml-2 text-xs text-gray-500"}>
          {stargazerCount} stars
        </span>
      </div>
    </div>
  );
};

export default ReposListItem;
