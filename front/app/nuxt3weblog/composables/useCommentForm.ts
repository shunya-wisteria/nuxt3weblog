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

export async function usePostComment(formInput:any)
{
  const config = useRuntimeConfig();
  const formId = config.public.comFormId;
  const url = "https://docs.google.com/forms/d/e/" + formId + "/formResponse";

  try {
    await fetch(
      url,
      {
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        body : formInput
      }
    );

    return true;

  } catch (error) {
    return false
  }
}