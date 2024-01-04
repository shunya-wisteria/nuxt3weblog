<template>
  <template v-if="data">
    <h1>
      {{ data.title }}
    </h1>
    <img
      :src="data.eyecatch?.url"
      :width="data.eyecatch?.width"
      :height="data.eyecatch?.height"
      alt=""
    />
    <div>
      <div>
        {{ data.category?.cat_name }}
      </div>
      <div>
        {{ data.publishedAt ?? data.createdAt }}
      </div>
    </div>
    <div v-html="data.body"></div>
  </template>
</template>

<script setup lang="ts">
import type { Post } from "~~/types/post";

const { params } = useRoute();

const { data } = await useMicroCMSGetListDetail<Post>({
  endpoint: "posts",
  contentId: Array.isArray(params.id) ? params.id[0] : params.id,
});
</script>