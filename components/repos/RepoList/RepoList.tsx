import RepoListItem from "./RepoListItem";
import clsx from "clsx";
import { RepoFieldsFragment } from "../../../__generated__/graphql";

interface ReposListProps {
  repos: RepoFieldsFragment[];
  className?: string;
}

const RepoList = ({ repos, className }: ReposListProps) => {
  return (
    <div
      className={clsx(className, "transition-opacity")}
      data-testid="RepoList"
    >
      {repos.map((repo) => (
        <RepoListItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default RepoList;
