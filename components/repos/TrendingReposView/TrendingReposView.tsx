import { useEffect, useState } from "react";
import { RepoListModel } from "../../../models/repo";
import { ZodError } from "zod";
import ReposList from "../ReposList/ReposList";
import { useRepos } from "../../../graphql/repos/queries/repos";
import { oneWeekAgo } from "../../../utils/oneWeekAgo";
import programmingLanguages from "../../../data/programming-languages";

const TrendingReposView = () => {
  const [validationError, setValidationError] = useState<ZodError>();
  const { repos, fetching, error } = useRepos({
    query: `created:>${oneWeekAgo()}`,
  });

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
      <div>
        <div className="mb-6 flex align-middle justify-between">
          <h1 className={"text-3xl"}>Trending This Week</h1>
          <select className={"mb-2 w-1/5"}>
            <option>Choose Language</option>
            {Object.keys(programmingLanguages).map((category) => (
              <optgroup key={category} label={category}>
                {Object.keys(programmingLanguages[category]).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        {fetching ? <p>Loading...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {validationError ? <p>Error: {validationError.message}</p> : null}
        {repos ? (
          <>
            <ReposList repos={repos} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TrendingReposView;
