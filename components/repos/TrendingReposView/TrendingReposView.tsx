import { useEffect, useState } from "react";
import { RepoListModel } from "../../../models/repo";
import { ZodError } from "zod";
import ReposList from "../ReposList/ReposList";
import { useRepos } from "../../../graphql/repos/queries/repos";
import programmingLanguages from "../../../data/programming-languages";
import Select from "../../form/Select/Select";
import { buildSearchQuery } from "../../../models/common";
import subDays from "date-fns/subDays";
import format from "date-fns/format";

let datesMap = {
  week: () => format(subDays(new Date(), 7), "yyyy-MM-dd"),
  month: () => format(subDays(new Date(), 30), "yyyy-MM-dd"),
  year: () => format(subDays(new Date(), 365), "yyyy-MM-dd"),
};

const TrendingReposView = () => {
  let oneWeekAgo = datesMap["week"]();
  let q = buildSearchQuery({ created: `>${oneWeekAgo}` });
  const [validationError, setValidationError] = useState<ZodError>();
  const [languages, setLanguages] = useState<string[]>([]);

  const [result, reexecuteQuery] = useRepos({
    query: q,
  });

  const { repos, fetching, error } = result;

  useEffect(() => {
    if (repos) {
      const result = RepoListModel.safeParse(repos);

      if (!result.success) {
        setValidationError((e) => (!e ? result.error : e));
      }
    }
  }, [repos]);

  const handleLanguageChange = (selected: string[]) => {
    setLanguages(selected);
  };

  return (
    <div>
      <div>
        <div className="mb-6 flex align-middle justify-between">
          <h1 className={"text-3xl"}>Trending This Week</h1>
          <Select
            onChange={handleLanguageChange}
            options={programmingLanguages}
            placeholder={"Language"}
          />
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
