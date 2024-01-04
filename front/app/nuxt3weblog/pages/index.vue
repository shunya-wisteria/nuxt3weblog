<template>
  <section>
    <PostIndex :posts="data?.contents"/>
  </section>
</template>

<script setup lang="ts">
import type { Post } from "~~/types/post";

const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const { data } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: {limit:pageLimit, offset:0}
});

// const cnt = data.value?.contents.length ? data.value?.contents.length : 0;

// const posts = []

// for(let i = 0; i < cnt; i++)
// {
//   const post = {
//     id : data.value?.contents[i].id,
//     title : data.value?.contents[i].title,
//     abstract : data.value?.contents[i].abstract,
//     eycatch : data.value?.contents[i].eyecatch,
//     publishedAt : 

//   title : string;
//   abstract : string;
//   eycatch : MicroCMSImage | null;
//   publishedAt : string;
//   }
// }



</script>