import { RepoList } from "../../../models/repo";
import ReposListItem from "./ReposListItem";
import clsx from "clsx";

interface ReposListProps {
  repos: RepoList;
  className?: string;
}

const ReposList = ({ repos, className }: ReposListProps) => {
  return (
    <div className={clsx(className, "transition-opacity")}>
      {repos.map((repo) => (
        <ReposListItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default ReposList;
