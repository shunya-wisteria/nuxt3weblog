import { Static } from "vue";
import type { Post } from "~~/types/post";

const getPostRoutes = async () => {
  const pageLimit = 100;
  const apiKey = process.env.MICROCMS_API_KEY
  const reqUrl = (process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "") + "/posts?field=id&limit=" + pageLimit;

  const response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        'X-MICROCMS-API-KEY': apiKey ? apiKey : ""
      }
    }
  );
  let ids: any = [];
  ids = (await response.json()).contents;
  return ids.map((obj: { id: string }) => `/posts/${obj.id}`)
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
