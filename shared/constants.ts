import { join } from "path";

export const NAME = 'chungguo';
export const GA_TRACKING_ID = 'UA-139659149-1';
export const SELF_BREIF = "Currently, I am a web frontend programmer with React and Typescript as my main technology stack. But I've also worked with Vue and developed large server-side projects in Nodejs for a few years. In my spare time, I often travel around the city I live in to make life more interesting.";
export const SEARCH_ISSUE_URL = 'https://api.github.com/search/issues';
export const ISSUE_LIST_URL = 'https://api.github.com/repos/chungguo/chungguo/issues';
export const PAGE_SIZE = 100;
export const HEADERS = {
  Accept: 'application/vnd.github.v3+json',
};
export const POST_DIRECTORY = join(process.cwd(), './posts/');
export const RSS_PATH = join(process.cwd(), './public/rss.xml');
