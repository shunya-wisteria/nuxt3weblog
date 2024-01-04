import type { Post } from "~~/types/post";

export async function useGetPostsCount(queries:any) {
  const fOption = {key:"total"}
  const { data } = await useMicroCMSGetList<Post>({
    endpoint: "posts",
    queries: queries
  },fOption);

  return Number(data.value?.totalCount) ? Number(data.value?.totalCount) : 0;
}

export async function useGetPostsPerPage(page:number, pageLimit:number, tag:string, category:string) {
  // ToDo tag/categoryの絞り込みを追加する


  const offset = pageLimit * page;
  const tagKey = tag ? tag : "";
  const catKey = category ? category : "";
  const keyStr = "posts_" + tag + category + "_" + page.toString();
  const fOption = {key:keyStr}
  const { data } = await useMicroCMSGetList<Post>({
    endpoint: "posts",
    queries: {limit:pageLimit, offset:offset}
  },fOption);

  return data.value?.contents;
}