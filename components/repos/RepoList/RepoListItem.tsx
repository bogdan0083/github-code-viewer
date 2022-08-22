import Link from "next/link";
import LangLabel from "../../common/LangLabel/LangLabel";
import { RepoFieldsFragment } from "../../../__generated__/graphql";
import { prettifyNumberToThousands } from "../../../lib/utils/prettify";
import { TbGitFork } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";

interface ReposListProps extends RepoFieldsFragment {}

const RepoListItem = ({
  id,
  nameWithOwner,
  name,
  owner,
  description,
  forkCount,
  stargazerCount,
  primaryLanguage = null,
  defaultBranchRef,
}: ReposListProps) => {
  return (
    <div
      key={id}
      className={
        "mb-1 rounded border border-gray-200 p-3 mb-3 shadow last:mb-0 transition-colors hover:bg-gray-100"
      }
      data-testid={`RepoListItem`}
    >
      <Link href={`/${nameWithOwner}/blob/${defaultBranchRef?.name}/README.md`}>
        <a className={"font-bold lg:text-xl block mb-1"}>
          <span>{name}</span>/
          <span className={"inline-block"}>{owner.login}</span>
        </a>
      </Link>
      <p className={"text-xs lg:text-sm text-gray-500"}>{description}</p>
      <div className="mt-3 flex items-center">
        {primaryLanguage && (
          <LangLabel
            name={primaryLanguage.name}
            color={primaryLanguage?.color || null}
            className={"text-xs mr-3"}
          />
        )}
        <div className={"mr-3 flex items-center text-xs text-gray-500"}>
          <TbGitFork size={14} className={"mr-1"} />
          {prettifyNumberToThousands(forkCount)}
        </div>
        <div className={"mr-3 flex items-center text-xs text-gray-500"}>
          <RiStarSLine size={14} className={"mr-1"} />
          {prettifyNumberToThousands(stargazerCount)}
        </div>
      </div>
    </div>
  );
};

export default RepoListItem;
