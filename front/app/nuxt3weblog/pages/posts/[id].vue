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
const pageTitle = pageInfo?.title ?? 'Blog';
const config = useRuntimeConfig();
const ogUrl = config.public.metaOgUrl;

const buildPostJsonLd = () => {
  const post = data.value;
  if (!post) {
    return null;
  }

  const canonicalUrl = `${ogUrl}/posts/${post.id}/`;
  const imageUrl = post.eyecatch?.url ?? '';
  const authorName = pageInfo?.author ?? pageTitle;
  const authorUrl = `${ogUrl}/about/`;
  const keywords = post.tags?.map((tag:any) => tag.name).filter(Boolean) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title ?? '',
    description: post.abstract ?? '',
    image: imageUrl ? [imageUrl] : [],
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl
    },
    publisher: {
      '@type': 'Organization',
      name: pageTitle,
      logo: {
        '@type': 'ImageObject',
        url: config.public.metaOgUrl ? `${config.public.metaOgUrl}/favicon.ico` : '',
      },
    },
    datePublished: post.publishedAt ?? post.createdAt ?? '',
    dateModified: post.revisedAt ?? post.updatedAt ?? post.publishedAt ?? post.createdAt ?? '',
    articleSection: post.category?.cat_name ?? '',
    keywords,
  };
};

useHead(() => {
  const postJsonLd = buildPostJsonLd();

  return {
    title:data.value?.title,
    meta:[
      { hid: 'description', name: 'description', content: data.value?.abstract },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:url', property: 'og:url', content: ogUrl + '/posts/' + data.value?.id + '/' },
      { hid: 'og:title', property: 'og:title', content: data.value?.title + " - " +  pageTitle},
      { hid: 'og:description', property: 'og:description', content: data.value?.abstract },
      { hid: 'og:image', property: 'og:image', content: data.value?.eyecatch == null ? '':data.value.eyecatch.url },
    ],
    link: [
      {
        rel: 'canonical',
        href: ogUrl + '/posts/' + data.value?.id + '/'
      }
    ],
    script: postJsonLd ? [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(postJsonLd)
    }] : []
  };
})
</script>