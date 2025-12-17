export async function useGetComments(entryID:string)
{
  // プリレンダ／サーバー実行中は外部API呼び出しを避ける
  if (typeof window === 'undefined') {
    return null;
  }

  const config = useRuntimeConfig();
  const url = config.public.comApiEndpoint + "?entry=" + entryID;
  try {
    const apiRes = await fetch(url, { method: "GET" });
    if (!apiRes || !apiRes.ok) {
      return null;
    }
    const comRes = await apiRes.json();

    if (comRes.status != 'S') {
      return null;
    }
    const comments = comRes.res.comments;

    return comments;
  } catch (error) {
    // ビルド／プリレンダー中にタイムアウト等で失敗することがあるため安全にフォールバック
    // 開発中はログを吐く
    // eslint-disable-next-line no-console
    console.warn('useGetComments fetch failed:', error);
    return null;
  }
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

}