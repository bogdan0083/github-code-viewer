import DOMPurify from "dompurify";
import { marked } from "marked";
import { GITHUB_URL } from "./constants";

marked.use({ gfm: true, baseUrl: GITHUB_URL });
/*
 * Prepares markdown raw data by doing the following:
 * 1. Sanitize file to avoid xss vulterability
 * 2. Replace all files with related paths to absolute paths pointing to GitHub url
 * 3. Replace all raw relative image links to GITHUB_URL path 
    (@see https://github.com/markedjs/marked/issues/2553)
 */
export function prepareMarkdown(rawMarkdown: string, baseImgPath: string) {
  // Override function

  const sanitized = DOMPurify.sanitize(rawMarkdown);
  const prepared = marked.parse(sanitized, {
    baseUrl: baseImgPath,
  });

  return prepared.replaceAll(
    /\<img.*src=\"((?!http))/g,
    `<img src="${baseImgPath}$1`
  );
}
