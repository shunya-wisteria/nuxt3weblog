<template>
  <template v-if="cat">
    <Category :category="cat"></Category>
  </template>
</template>

<script setup>
const cat = await useGetCategories();

</script>