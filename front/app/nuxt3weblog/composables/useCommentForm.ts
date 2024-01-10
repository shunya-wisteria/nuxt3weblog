export async function useGetComments(entryID:string)
{
  const config = useRuntimeConfig();
  const url = config.public.comApiEndpoint + "?entry=" + entryID;
  const apiRes = await fetch(
    url,
    {
      method: "GET"
    }
  );
  const comRes = await apiRes.json();

  if(comRes.status != 'S')
  {
    return null;
  }
  const comments = comRes.res.comments;

  return comments;
}