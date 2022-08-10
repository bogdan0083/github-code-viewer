import { SearchType } from "../../generated/graphql";

export type SearchOptions = {
  query?: string;
  limit?: number;
  language?: string;
  after?: string;
  created?: string;
  stars?: number;
  type: SearchType;
};

export function buildSearchQuery({
  query = "",
  language = "",
  created,
  stars,
}: Pick<SearchOptions, "query" | "language" | "created" | "stars">): string {
  let preparedCreated = `created:${created}`;

  let result = [];

  if (query) {
    result.push(`${query}`);
  }

  if (language) {
    let preparedLanguage = `language:${language}`;
    result.push(preparedLanguage);
  }

  if (created) {
    result.push(preparedCreated);
  }

  if (stars) {
    let preparedStars = `stars:>${stars}`;
    result.push(preparedStars);
  }

  return result.join(" ");
}
