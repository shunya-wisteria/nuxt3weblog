<template>
  <ul>
    <li v-for="blog in posts" :key="blog.id">
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
// import type { FetchOptions } from "microcms-js-sdk";

const route = useRoute();
const page = ref(Number(route.query.page) ? Number(route.query.page) : 1);


const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const postsData = [];

const totalCount = await useGetPostsCount({limit:1, offset:0})

const maxPage = Math.ceil(totalCount / pageLimit);
for(let i = 0; i<maxPage; i++)
{
  const posts = await useGetPostsPerPage(i, pageLimit, "", "")
  postsData.push(posts)

}
const posts = ref(postsData[page.value - 1]);

</script>