import type { BlogAbstract } from "~/types/blogabstract";

export async function useBlogAbstract(entryId: string, entryBody: string, useCache: boolean, savaCache: boolean): Promise<string> {
  const config = useRuntimeConfig();

  if(config.public.blogAbstractApiEndpoint == null || config.public.blogAbstractApiEndpoint == "")
  {
    return "";
  }

  const key = "BlogAbstract-" + entryId;

  const { data } =await useAsyncData(
    key,
    () => $fetch(
      config.public.blogAbstractApiEndpoint,
      {
        method : "POST",
        body : {
          entryId: entryId,
          entryBody: entryBody,
          useCache: useCache,
          saveCache: savaCache
        }
      }
    )
  );

  if(data.value == null)
  {
    return "";
  }

  return ((data.value) as BlogAbstract).abstract;

}