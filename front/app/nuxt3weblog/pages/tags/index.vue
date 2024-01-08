<template>
  <template v-if="tag">
    <Tag :tag="tag"></Tag>
  </template>

</template>

<script setup>
const tag = await useGetTags();
</script>