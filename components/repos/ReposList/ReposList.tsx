import { Repo } from "../../../models/repo";
import ReposListItem from "./ReposListItem";
import clsx from "clsx";

interface ReposListProps {
  repos: Repo[];
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
