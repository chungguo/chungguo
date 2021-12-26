
import { join } from "path";

export const SEARCH_ISSUE_URL = 'https://api.github.com/search/issues';
export const ISSUE_LIST_URL = 'https://api.github.com/repos/chungguo/chungguo/issues';
export const PAGE_SIZE = 100;
export const HEADERS = {
  Accept: 'application/vnd.github.v3+json',
};
export const POST_DIRECTORY = join(process.cwd(), './posts');
