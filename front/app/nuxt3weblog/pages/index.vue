<template>
  <ul>
    <li v-for="blog in data?.contents" :key="blog.id">
      <NuxtLink :to="`/posts/${blog.id}`">
        <img
          :src="blog.eyecatch?.url"
          :width="blog.eyecatch?.width"
          :height="blog.eyecatch?.height"
          alt=""
        />
        <div>
          <div>
            {{ blog.category?.cat_name }}
          </div>
          <div>
            {{ blog.title }}
          </div>
          <div>
            {{ blog.publishedAt ?? blog.createdAt }}
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Post } from "~~/types/post";

const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const { data } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: {limit:pageLimit, offset:0}
});



</script>