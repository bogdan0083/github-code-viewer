import { z } from "zod";

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export type DateSchema = z.infer<typeof dateSchema>;

export type SearchOptions = {
  query?: string;
  limit?: number;
  language?: string;
  after?: string;
  created?: string;
};

export const buildSearchQuery = ({
  query = "",
  language = "",
  created,
}: Pick<SearchOptions, "query" | "language" | "created">): string => {
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

  return result.join(" ");
};
