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

export async function usePostComment(comReq:any)
{
  const config = useRuntimeConfig();
  const url = config.public.comApiEndpoint;
  try{
    const apiRes = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify(comReq)
      }
    );
    const comRes = await apiRes.json();
    if(comRes.status != 'S')
    {
      return false;
    }

    return true;

  }catch(error) {
    return false;
  }

  // const formId = config.public.comFormId;
  // const url = "https://docs.google.com/forms/d/e/" + formId + "/formResponse";

  // try {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", url, true);
  //   xhr.send(formInput);

  //   return true;

  // } catch (error) {
  //   return false
  // }
}