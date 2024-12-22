import { Static } from "vue";

// Post件数取得
const getPostCount = async (endpoint:string, filters:string) => {
  const apiKey = process.env.MICROCMS_API_KEY;
  const url = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/" + endpoint + "?field=totalCount&limit=1&filters=" + filters;
  const res = await fetch(
    url,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiKey ? apiKey : ""
      }
    }
  );
  const totalCount = (await res.json()).totalCount;
  return totalCount;
}

// Postルート取得
const getPostRoutes = async () => {
  const pageLimit = 10;
  const apiKey = process.env.MICROCMS_API_KEY

  // Get Posts count
  const totalCount = await getPostCount("posts", "");
  const maxPage = Math.ceil(totalCount / pageLimit);

  let ids: any = [];
  for(let i = 0; i < maxPage; i++){
    const offset = pageLimit * i;
    const url = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/posts?field=id&limit=" + pageLimit + "&offset=" + offset;

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
const getPostsList = async () => {
  const totalCount = await getPostCount("posts", "");
  const pageLimit = Number(process.env.PAGE_LIMIT) > 0 ? Number(process.env.PAGE_LIMIT) : 1;
  const maxPage = Math.ceil(totalCount / pageLimit);
  const pageList = [];
  for(let i = 0; i < maxPage; i++)
  {
    pageList.push({page:(i+1).toString()});
  }
  return pageList.map((obj:{page:string}) => `/postsList/${obj.page}`);
}

const getTags = async () => {
  const apiKey = process.env.MICROCMS_API_KEY;
  const url = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/tags?field=id&limit=100";
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
  return id.map((obj: { id: string }) => `/tags/${obj.id}`);
}

const getCategories = async () => {
  const apiKey = process.env.MICROCMS_API_KEY;
  const url = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/categories?field=id&limit=100";
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
  return id.map((obj: { id: string }) => `/categories/${obj.id}`);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ssr: true,

  hooks: {
    async 'nitro:config'(nitroConfig) {
      const slugs = await getPostRoutes();
      nitroConfig.prerender?.routes?.push(...slugs);

      const postList = await getPostsList();
      nitroConfig.prerender?.routes?.push(...postList);

      const tags = await getTags();
      nitroConfig.prerender?.routes?.push(...tags);

      const categories = await getCategories();
      nitroConfig.prerender?.routes?.push(...categories);
    }
  },

  app:{
    head:{
      titleTemplate: '%s - ' + process.env.SITE_TITLE,
      title: process.env.SITE_TITLE,
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.META_DESCRIPTION },
        { hid: 'theme-color', name: 'theme-color', content: '#E8E8EF'},
  
        { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_TITLE },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: process.env.META_OG_URL },
        { hid: 'og:title', property: 'og:title', content: process.env.SITE_TITLE },
        { hid: 'og:description', property: 'og:description', content: process.env.META_DESCRIPTION },
        { hid: 'og:image', property: 'og:image', content: process.env.META_OG_IMG },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', property: 'twitter:site', content: process.env.META_TWITTER_ID }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' }
      ]
    },
  
  },

  devtools: { enabled: true },

  // @ts-ignore
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/google-fonts',
    'nuxt-microcms-module',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
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
    target: "all",
  },

  plugins: [
    '~/plugins/vue3-smooth-scroll.ts',
  ],

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  site:{
    url: process.env.HOST_NAME,
    trailingSlash: true
  },

  gtag:{
    id: process.env.GAID,
  },

  runtimeConfig: {
    public: {
      pageLimit: process.env.PAGE_LIMIT,
      metaOgUrl: process.env.META_OG_URL,
      photomapUrl : process.env.PHOTOLOG_URL,

      comFormEnabled : process.env.COM_FORM_ENABLED,
      comFormId : process.env.FORM_ID,
      formNameField : process.env.FORM_NAME_FIELD,
      formEmailField : process.env.FORM_EMAIL_FIELD,
      formCommentField : process.env.FORM_COMMENT_FIELD,
      formEntryidField : process.env.FORM_ENTRYID_FIELD,
      comApiEndpoint : process.env.COM_API_ENDPOINT,
    }
  },

  compatibilityDate: '2024-10-19'
})