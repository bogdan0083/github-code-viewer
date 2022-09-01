import Link from "next/link";
import LangLabel from "../../common/LangLabel/LangLabel";
import { RepoFieldsFragment } from "../../../__generated__/graphql";
import { prettifyNumberToThousands } from "../../../lib/utils/prettify";
import { TbGitFork } from "react-icons/tb";
import { RiStarSLine } from "react-icons/ri";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";
import clsx from "clsx";

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
  const [paletteMode] = usePaletteMode();
  return (
    <div
      key={id}
      className={clsx({
        "mb-1 rounded border p-3 mb-3 shadow last:mb-0 transition-colors": true,
        "border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800":
          paletteMode === PaletteMode.System,
      })}
      data-testid={`RepoListItem`}
    >
      <Link href={`/${nameWithOwner}/blob/${defaultBranchRef?.name}/README.md`}>
        <a
          className={clsx({
            "lg:text-xl block mb-1": true,
            "font-bold dark:font-medium": paletteMode === PaletteMode.System,
          })}
        >
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
            className={clsx({
              "text-xs mr-3": true,
              // @TODO: add darken function for label color
              "dark:opacity-70": paletteMode === PaletteMode.System,
            })}
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
