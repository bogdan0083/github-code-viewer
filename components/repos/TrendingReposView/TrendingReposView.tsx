import { useTrendingRepos } from "../../../graphql/repositories/queries/trendingRepositories";
import { useEffect, useState } from "react";
import { RepoListModel } from "../../../models/repo";
import { ZodError } from "zod";
import ReposList from "../ReposList/ReposList";

const TrendingReposView = () => {
  const [validationError, setValidationError] = useState<ZodError>();
  const { repos, fetching, error } = useTrendingRepos();

  useEffect(() => {
    if (repos) {
      const result = RepoListModel.safeParse(repos);
      console.log("triggering useEffect");

      if (result.success) {
        console.log("TrendingReposView Success:", result);
      } else {
        console.log("TrendingReposView Error:", result.error);
        console.log("this is triggered");
        setValidationError((e) => (!e ? result.error : e));
      }
    }
  }, [repos]);

  return (
    <div>
      <h1 className={"text-3xl mb-4"}>Trending This Week</h1>
      {fetching ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      {validationError ? <p>Error: {validationError.message}</p> : null}
      {repos ? <ReposList repos={repos} /> : null}
    </div>
  );
};

export default TrendingReposView;
