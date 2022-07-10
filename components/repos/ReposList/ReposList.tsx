import { Repo } from "../../../models/repo";
import ReposListItem from "./ReposListItem";

interface ReposListProps {
  repos: Repo[];
  className?: string;
}

const ReposList = ({ repos, className }: ReposListProps) => {
  return (
    <div className={className}>
      {repos.map((repo) => (
        <ReposListItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default ReposList;
