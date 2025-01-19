<template>
  <template v-if="about">
    <About :about="about"></About>
  </template>
</template>

<script setup lang="ts">
import type { About } from '~/types/about';
const about = (await useMicroCMSGetObject<About>({endpoint:"about"},{key:"about"})).data;

useHead({
  title:"About"
})

</script>