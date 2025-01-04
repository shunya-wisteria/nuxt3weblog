// Post件数取得
export async function useGetPostsCountServ(reqEndpoint:string, filters:string, apiInfo:{key:string, endpoint:string}):Promise<number>{
  const url = apiInfo.endpoint + "/" + reqEndpoint + "?field=totalCount&limit=1&filters=" + filters;
  const res = await fetch(
    url,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiInfo.key
      }
    }
  );
  const totalCount = (await res.json()).totalCount;
  return totalCount;
}

// Postルート取得
export async function useGetPostRoutesServ(apiKey:string, apiEndpoint:string):Promise<string[]> {
  const pageLimit = 10;

  // Get Posts count
  const totalCount = await useGetPostsCountServ("posts", "", {key : apiKey, endpoint: apiEndpoint})
  const maxPage = Math.ceil(totalCount / pageLimit);

  let ids: any = [];
  for(let i = 0; i < maxPage; i++){
    const offset = pageLimit * i;
    const url = apiEndpoint + "/posts?field=id&limit=" + pageLimit + "&offset=" + offset;

    const res = await fetch(
      url,
      {
        method: "GET",
        headers: {
          'X-MICROCMS-API-KEY': apiKey
        }
      }
    );
    const id = (await res.json()).contents;
    if(ids.length == 0)
    {
      ids = id
    }
    else
    {
      ids = ids.concat(id)
    }
  }
  return ids.map((obj: { id: string }) => `/posts/${obj.id}`);
}

// PostListルート取得
export async function useGetPostListRoutesServ(apiKey:string, apiEndpoint:string, pageLimit:number):Promise<string[]>
{
  const totalCount:number = await useGetPostsCountServ("posts", "", {key:apiKey, endpoint:apiEndpoint});
  const maxPage = Math.ceil(totalCount / pageLimit);
  const pageList = [];
  for (let i = 0; i < maxPage; i++)
  {
    pageList.push({ page: (i + 1).toString() });
  }
  return pageList.map((obj: { page: string }) => `/postsList/${obj.page}`);
}

// タグListルート取得
export async function useGetTagsRouteServ(apiKey:string, apiEndpoint:string, pageLimit:number):Promise<string[]>
{
  const url = apiEndpoint + "/tags?field=id&limit=100";
  const res = await fetch(
    url,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiKey
      }
    }
  );
  const id = (await res.json()).contents;

  const routeList = [];
  // タグ毎にページングルート作成
  for(let i = 0; i < id.length; i++)
  {
    // index用ルート
    routeList.push({id: id[i].id, page: ""});
    // 対象post件数
    const totalCount = await useGetPostsCountServ("posts", "tags[contains]" + id[i].id, {key:apiKey, endpoint:apiEndpoint});
    // ページ数
    const maxPage = Math.ceil(totalCount / pageLimit);
    for(let j = 0; j < maxPage; j++)
    {
      routeList.push({id: id[i].id, page: (j+1).toString()});
    }
  }
  return routeList.map((obj:{id : string, page : string}) => `/tags/${obj.id}/${obj.page}`)
}

// カテゴリListルート取得
export async function useGetCategoriesRouteServ(apiKey:string, apiEndpoint:string, pageLimit:number):Promise<string[]>
{
  const url = apiEndpoint + "/categories?field=id&limit=100";
  const res = await fetch(
    url,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiKey
      }
    }
  );
  const id = (await res.json()).contents;

  const routeList = [];
  // カテゴリ毎にページングルート作成
  for(let i = 0; i < id.length; i++)
  {
    // index用ルート
    routeList.push({id: id[i].id, page: ""});
    // 対象post件数
    const totalCount = await useGetPostsCountServ("posts", "category[equals]" + id[i].id, {key:apiKey, endpoint:apiEndpoint});

    // ページ数
    const maxPage = Math.ceil(totalCount / pageLimit);
    for(let j = 0; j < maxPage; j++)
    {
      routeList.push({id: id[i].id, page: (j+1).toString()});
    }
  }
  return routeList.map((obj:{id : string, page : string}) => `/categories/${obj.id}/${obj.page}`)
}
