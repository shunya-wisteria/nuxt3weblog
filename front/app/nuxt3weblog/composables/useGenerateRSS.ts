import fs from 'fs';
import path from 'path';
import { useGetPostsCountServ } from './useMicrocmsImpServ';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function useGenerateRSS(apiKey:string, apiEndpoint:string){
  const pageLimit = 10;

  const maxPage = 2

  let rssItems:any[] = [];

  for(let i = 0; i < maxPage; i++)
  {
    let rssItemsTemp = [];

    const offset = pageLimit * i;
    const url = apiEndpoint + "/posts?limit=" + pageLimit + "&offset=" + offset;

    const res = await fetch(
      url,
      {
        method: "GET",
        headers: {
          'X-MICROCMS-API-KEY': apiKey
        }
      }
    );
    const posts = (await res.json()).contents;
    rssItemsTemp = posts.map((post:any) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(process.env.HOST_NAME + '/posts/' + post.id)}</link>
      <description>${escapeXml(post.abstract)}</description>
      <pubDate>${escapeXml(new Date(post.publishedAt).toUTCString())}</pubDate>
    </item>
    `).join('');

    if(rssItems.length == 0)
    {
      rssItems = rssItemsTemp;
    }
    else
    {
      rssItems = rssItems.concat(rssItemsTemp);
    }

  }

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${process.env.SITE_TITLE}</title>
    <link>${process.env.HOST_NAME}</link>
    <description>${escapeXml(process.env.META_DESCRIPTION ? process.env.META_DESCRIPTION : "")}</description>
    ${rssItems}
  </channel>
</rss>
  `;
  fs.writeFileSync(path.resolve('./public/rss.xml'), rssFeed);

}