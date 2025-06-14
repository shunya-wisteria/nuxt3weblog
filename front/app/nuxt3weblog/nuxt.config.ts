import { useGetPostRoutesServ, useGetPostListRoutesServ, useGetTagsRouteServ, useGetCategoriesRouteServ } from "./composables/useMicrocmsImpServ";
import { useGenerateRSS } from "./composables/useGenerateRSS";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ssr: true,

  hooks: {
    async 'nitro:config'(nitroConfig) {
      // 動的ルーティングのプリレンダリング設定
      const apiKey:string = process.env.MICROCMS_API_KEY ? process.env.MICROCMS_API_KEY : "";
      const apiEndpoint:string = process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "";
      const pageLimit:number = Number(process.env.PAGE_LIMIT) > 0 ? Number(process.env.PAGE_LIMIT) : 1;

      const slugs = await useGetPostRoutesServ(apiKey, apiEndpoint);
      nitroConfig.prerender?.routes?.push(...slugs);

      const postList = await useGetPostListRoutesServ(apiKey, apiEndpoint, pageLimit);
      nitroConfig.prerender?.routes?.push(...postList);

      const tags = await useGetTagsRouteServ(apiKey, apiEndpoint, pageLimit);
      nitroConfig.prerender?.routes?.push(...tags);

      const categories = await useGetCategoriesRouteServ(apiKey, apiEndpoint, pageLimit);
      nitroConfig.prerender?.routes?.push(...categories);
    },

    async 'nitro:build:before'(){
      const apiKey:string = process.env.MICROCMS_API_KEY ? process.env.MICROCMS_API_KEY : "";
      const apiEndpoint:string = process.env.MICROCMS_API_ENDPOINT ? process.env.MICROCMS_API_ENDPOINT : "";
      await useGenerateRSS(apiKey, apiEndpoint);
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
      comApiEndpoint : process.env.COM_API_ENDPOINT,

      blogAbstractApiEndpoint: process.env.BLOG_ABSTRACT_API_ENDPOINT,
    }
  },

  compatibilityDate: '2024-10-19'
})