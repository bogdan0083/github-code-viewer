import { useMemo, useState } from "react";
import programmingLanguages from "../../../lib/data/programming-languages";
import Select from "../../form/Select/Select";
import {
  buildSearchQuery,
  SearchOptions,
} from "../../../lib/utils/buildSearchQuery";
import {
  RepoFieldsFragment,
  SearchType,
  useSearchQuery,
} from "../../../generated/graphql";
import ReposList from "../ReposList/ReposList";
import clsx from "clsx";
import ThemedButton from "../../common/ThemedButton/ThemedButton";

interface ReposViewProps extends Omit<SearchOptions, "type"> {
  title: string;
}

const RepoListView = ({
  query,
  language,
  created,
  title,
  stars,
}: ReposViewProps) => {
  const [after, setAfter] = useState<string | null>(null);

  const [languages, setLanguages] = useState<string[]>(
    language ? [language] : []
  );

  let builtQuery = useMemo(
    () =>
      buildSearchQuery({
        query,
        language: languages[0],
        created,
        stars,
      }),
    [query, languages, created, stars]
  );

  const [result] = useSearchQuery({
    variables: {
      query: builtQuery,
      type: SearchType.Repository,
      limit: 10,
      after,
    },
  });
  console.log(result);

  const { data, error, fetching } = result;

  if (error) {
    throw error;
  }

  console.log(data);

  const handleLanguageChange = (selected: string[]) => {
    setLanguages(selected);
  };

  return (
    <div data-testid={"RepoListView"}>
      <div>
        <div className="mb-6 lg:flex lg:items-center lg:justify-between">
          <h1 className={"text-xl md:text-2xl lg:text-3xl"}>{title}</h1>
          <Select
            onChange={handleLanguageChange}
            options={programmingLanguages}
            placeholder={"Language"}
            className={"mt-3 w-full lg:w-4/12 lg:mt-0"}
            data-testid={"LanguageSelect"}
          />
        </div>
        <div data-testid={"RepoListView-container"}>
          {fetching && !data ? <p>Loading...</p> : null}
          {data ? (
            <>
              {data.search.nodes && data.search.nodes.length > 0 ? (
                <ReposList
                  repos={data.search.nodes as RepoFieldsFragment[]}
                  className={clsx({ "cursor-progress opacity-30": fetching })}
                />
              ) : (
                "No repos found"
              )}
              {data.search.pageInfo.hasNextPage && (
                <ThemedButton
                  loading={fetching}
                  className={"mt-3"}
                  onClick={() =>
                    setAfter(data.search.pageInfo.endCursor || null)
                  }
                  fullWidth
                >
                  Load more
                </ThemedButton>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default RepoListView;
