import { join } from 'path';
import { readFile, access, writeFile } from 'fs/promises';
import { constants } from 'fs';
import { pick } from 'lodash';
import { stringify } from 'querystring';
import { Issue } from 'chungguo/types/post';
import {
  HEADERS,
  PAGE_SIZE,
  ISSUE_LIST_URL,
  SEARCH_ISSUE_URL,
  POST_DIRECTORY,
} from 'chungguo/shared/constants';

interface Params {
  labels?: string[],
  page?: number,
}

/** 查询 issue 总数 */
async function getIssueTotalCount(params: Params) {
  const { labels = ['post'] } = params;
  const query = `q=repo:chungguo/chungguo+type:issue+author:chungguo+state:closed+label:${labels.join(';')}&per_page=1`;
  const res = await fetch(`${SEARCH_ISSUE_URL}?${query}`, {
    method: 'GET',
    headers: HEADERS,
  });
  const json = await res.json();
  return json.total_count ?? 0;
}

/** 查询 issue 列表 */
async function getIssues(params: Params) {
  const { labels = ['post'], page = 0 } = params;

  const query = {
    page,
    state: 'closed',
    creator: 'chungguo',
    labels: labels.join(','),
    per_page: PAGE_SIZE,
  };

  const res = await fetch(`${ISSUE_LIST_URL}?${stringify(query)}`, {
    headers: HEADERS,
  });

  const json = await res.json();

  return json.map((item: Issue) => pick(item, [
    'id',
    'number',
    'title',
    'labels',
    'created_at',
    'body',
    'html_url',
  ]));
}

/** 获取所有 issue */
export async function getAllIssues(params: Params) {
  const { labels = ['post'] } = params;

  try {
    const dataPath = join(POST_DIRECTORY, 'issues.json');
    await access(dataPath, constants.R_OK | constants.W_OK);
    const str = await readFile(dataPath, 'utf-8');
    return JSON.parse(str);
  } catch (e) {
    console.log('get issues from github');
  }

  const totalCount: number = await getIssueTotalCount({
    labels,
  });
  /** 总共需要请求多少次能够拉取全部数据  */
  const times = Math.ceil(totalCount / PAGE_SIZE);
  const posts = await Promise.all(
    [...Array(times).keys()].map(page => {
      return getIssues({
        labels,
        page,
      });
    })
  );

  const issues = posts.reduce((pre, next) => pre.concat(next), []);

  await writeFile(join(POST_DIRECTORY, 'issues.json'), JSON.stringify(issues), 'utf-8');

  return issues;
}
