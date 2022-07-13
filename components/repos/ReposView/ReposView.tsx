import { useState } from "react";
import { RepoList } from "../../../models/repo";
import ReposList from "../ReposList/ReposList";
import programmingLanguages from "../../../data/programming-languages";
import Select from "../../form/Select/Select";
import { buildSearchQuery, SearchOptions } from "../../../models/common";
import clsx from "clsx";
import { useSearch } from "../../../graphql/search";

interface ReposViewProps extends Omit<SearchOptions, "type"> {
  title: string;
}

const ReposView = ({
  query,
  language,
  created,
  title,
  stars,
}: ReposViewProps) => {
  const [q] = useState(query);
  const [languages, setLanguages] = useState<string[]>(
    language ? [language] : []
  );

  let builtQuery = buildSearchQuery({
    query: q,
    language: languages[0],
    created,
    stars,
  });

  const [result] = useSearch({
    query: builtQuery,
    limit: 10,
    type: "REPOSITORY",
  });

  const { searchResults, validationError, fetching, error } = result;

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
        {fetching && !searchResults ? <p>Loading...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {validationError ? <p>Error: {validationError.message}</p> : null}
        {searchResults ? (
          <>
            <ReposList
              repos={searchResults.items as RepoList}
              className={clsx({ "cursor-progress opacity-30": fetching })}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ReposView;
