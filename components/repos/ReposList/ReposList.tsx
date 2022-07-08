import { Repo } from "../../../models/repo";
import ReposListItem from "./ReposListItem";

interface ReposListProps {
  repos: Repo[];
}

const ReposList = ({ repos }: ReposListProps) => {
  return (
    <div>
      {repos.map((repo) => (
        <ReposListItem key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default ReposList;
