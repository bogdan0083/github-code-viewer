import { useEffect, useState } from "react";
import { RepoListModel } from "../../../models/repo";
import { ZodError } from "zod";
import ReposList from "../ReposList/ReposList";
import { useRepos } from "../../../graphql/repos/queries/repos";
import programmingLanguages from "../../../data/programming-languages";
import Select from "../../form/Select/Select";
import { buildSearchQuery, SearchOptions } from "../../../models/common";
import clsx from "clsx";

interface ReposViewProps extends SearchOptions {
  title: string;
}

const ReposView = ({
  query,
  language,
  created,
  title,
  stars,
}: ReposViewProps) => {
  const [validationError, setValidationError] = useState<ZodError>();
  const [q] = useState(query);
  const [languages, setLanguages] = useState<string[]>(
    language ? [language] : []
  );

  let builtQuery = buildSearchQuery({
    query: q,
    created: created,
    language: languages[0],
    stars,
  });

  const [result] = useRepos({
    query: builtQuery,
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
          <h1 className={"text-3xl"}>{title}</h1>
          <Select
            onChange={handleLanguageChange}
            options={programmingLanguages}
            placeholder={"Language"}
            className={"w-3/12"}
          />
        </div>
        {fetching && !repos ? <p>Loading...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {validationError ? <p>Error: {validationError.message}</p> : null}
        {repos ? (
          <>
            <ReposList
              repos={repos}
              className={clsx({ "cursor-progress opacity-30": fetching })}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ReposView;
