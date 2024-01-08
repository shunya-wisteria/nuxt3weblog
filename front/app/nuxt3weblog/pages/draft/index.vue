<template>
  <template v-if="data">
    <Post :post="(data)"></Post>
  </template>
</template>

<script setup>
const { query } = useRoute();
const config = useRuntimeConfig();

const postId = query.id;
const draftKey = query.draftKey;

const { data } = await useMicroCMSGetListDetail({
  endpoint: "posts",
  contentId: postId,
  queries: {draftKey:draftKey}
});

</script>