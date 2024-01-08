import type { Post } from "~~/types/post";
import type { Category } from "~/types/category";
import type { Tag } from "~/types/tag";

export async function useGetPostsCount(queries:any) {
  const fOption = {key:"total"}
  const { data } = await useMicroCMSGetList<Post>({
    endpoint: "posts",
    queries: queries
  },fOption);

  return Number(data.value?.totalCount) ? Number(data.value?.totalCount) : 0;
}

export async function useGetPostsPerPage(page:number, pageLimit:number, tag:string, category:string) {
  const offset = pageLimit * page;
  const keyStr = "posts_" + tag + category + "_" + page.toString();
  const fOption = {key:keyStr};

  let queries = {};
  if(tag != "")
  {
    queries = {limit:pageLimit, offset:offset, filters:"tags[contains]" + tag};
  }
  else if(category != "")
  {
    queries = {limit:pageLimit, offset:offset, filters:"category[equals]" + category};
  }
  else
  {
    queries = {limit:pageLimit, offset:offset};
  }

  const { data } = await useMicroCMSGetList<Post>({
    endpoint: "posts",
    queries: queries
  },fOption);

  return data.value?.contents;
}

export async function useGetCategories() {
  const fOption = {key:"categories"}
  const { data } = await useMicroCMSGetList<Category>({
    endpoint: "categories",
    queries: {limit:100}
  }, fOption);

  return data.value?.contents;
}

export async function useGetTags() {
  const fOption = {key:"tags"}
  const { data } = await useMicroCMSGetList<Tag>({
    endpoint: "tags",
    queries: {limit:100}
  }, fOption);

  return data.value?.contents;
}