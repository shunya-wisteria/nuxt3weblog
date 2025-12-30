<template>
  <template v-if="about">
    <About :about="about"></About>
  </template>
</template>

<script setup lang="ts">
import type { About } from '~/types/about';

const about = ref(useState('About') as About);

useHead({
  title:"About"
})

</script>