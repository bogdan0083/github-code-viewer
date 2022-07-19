import { useMemo, useState } from "react";
import programmingLanguages from "../../../lib/data/programming-languages";
import Select from "../../form/Select/Select";
import { buildSearchQuery, SearchOptions } from "../../../lib/models/common";
import {
  RepoFieldsFragment,
  SearchType,
  useSearchQuery,
} from "../../../generated/graphql";
import ReposList from "../ReposList/ReposList";
import clsx from "clsx";

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

  let builtQuery = useMemo(
    () =>
      buildSearchQuery({
        query: q,
        language: languages[0],
        created,
        stars,
      }),
    [q, languages, created, stars]
  );

  const [result] = useSearchQuery({
    variables: {
      query: builtQuery,
      type: SearchType.Repository,
      limit: 10,
    },
  });

  const { data, error, fetching } = result;

  console.log(data, error, fetching);

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
        {fetching && !data ? <p>Loading...</p> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {data ? (
          <>
            <ReposList
              repos={data.search.nodes as RepoFieldsFragment[]}
              className={clsx({ "cursor-progress opacity-30": fetching })}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ReposView;
