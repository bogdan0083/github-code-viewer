import { z } from "zod";

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export type DateSchema = z.infer<typeof dateSchema>;

export type SearchType = "REPOSITORY" | "USER" | "ISSUE" | "ORG";

export type SearchOptions = {
  query?: string;
  limit?: number;
  language?: string;
  after?: string;
  created?: string;
  stars?: number;
  type: SearchType;
};

export const buildSearchQuery = ({
  query = "",
  language = "",
  created,
  stars,
}: Pick<SearchOptions, "query" | "language" | "created" | "stars">): string => {
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
};
