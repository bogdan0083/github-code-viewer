import ReposListItem from "./ReposListItem";
import clsx from "clsx";
import { RepoFieldsFragment } from "../../../generated/graphql";

interface ReposListProps {
  repos: RepoFieldsFragment[];
  className?: string;
}

const ReposList = ({ repos, className }: ReposListProps) => {
  return (
    <div
      className={clsx(className, "transition-opacity")}
      data-testid="RepoList"
    >
      {repos.map((repo) => (
        <ReposListItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default ReposList;
