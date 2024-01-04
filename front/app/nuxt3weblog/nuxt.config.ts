import { Static } from "vue";

const getPostRoutes = async () => {
  const pageLimit = 10;
  const apiKey = process.env.MICROCMS_API_KEY

  // Get Posts count
  const cntUrl = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/posts?field=id&limit=" + 0;
  const cntRes = await fetch(
    cntUrl,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiKey ? apiKey : ""
      }
    }
  );
  const totalCount = (await cntRes.json()).totalCount;
  const maxPage = Math.ceil(totalCount / pageLimit);

  let ids: any = [];
  for(let i = 0; i < maxPage; i++){
    const offset = pageLimit * i;
    const url = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/posts?field=id&limit=" + pageLimit + "&offset=" + offset;
    console.log(url)

    const res = await fetch(
      url,
      {
        method: "GET",
        headers: {
          'X-MICROCMS-API-KEY': apiKey ? apiKey : ""
        }
      }
    );
    const id = (await res.json()).contents;
    if(id.length == 0)
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  ssr: true,
  hooks: {
    async 'nitro:config'(nitroConfig) {
      const slugs = await getPostRoutes();
      nitroConfig.prerender?.routes?.push(...slugs);
    }
  },

  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/google-fonts',
    'nuxt-microcms-module'
  ],
  vuetify: {
    vuetifyOptions: 'vuetify.config.ts'
  },
  googleFonts: {
    families: {
      'Open Sans': true,
      'Rounded Mplus 1c': true,
      'Roboto': true
    }
  },
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  runtimeConfig: {
    public: {
      pageLimit: process.env.PAGE_LIMIT
    }
  }
})
