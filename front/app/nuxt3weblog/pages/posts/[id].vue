<template>
  <template v-if="data">
    <Post :post="(data as Post)" :blogAbstract="blogAbstract"></Post>
    <Comment :entryId="data.id" v-if="config.public.comFormEnabled == '1'"/>
  </template>
</template>

<script setup lang="ts">
import type { Post } from "~~/types/post";
import type { PageInfo } from "~~/types/pageinfo";

const { params } = useRoute();

const contentId = Array.isArray(params.id) ? params.id[0] : params.id;

// 本文取得
const { data } = await useMicroCMSGetListDetail<Post>({
  endpoint: "posts",
  contentId: contentId
});

// 本文要約
const blogAbstract = ref("");
if(data.value != null){
  blogAbstract.value = await useBlogAbstract(contentId, data.value.body, true, true);
}
else{
  blogAbstract.value = await useBlogAbstract(contentId, "", true, true);
}

const pageInfo = useState('PageInfo').value as PageInfo;
const pageTitle = pageInfo.title;
const config = useRuntimeConfig();
const ogUrl = config.public.metaOgUrl;

useHead({
  title:data.value?.title,
  meta:[
    { hid: 'description', name: 'description', content: data.value?.abstract },
    { hid: 'og:type', property: 'og:type', content: 'article' },
    { hid: 'og:url', property: 'og:url', content: ogUrl + '/posts/' + data.value?.id },
    { hid: 'og:title', property: 'og:title', content: data.value?.title + " - " +  pageTitle},
    { hid: 'og:description', property: 'og:description', content: data.value?.abstract },
    { hid: 'og:image', property: 'og:image', content: data.value?.eyecatch == null ? '':data.value.eyecatch.url },
  ]
})
</script>