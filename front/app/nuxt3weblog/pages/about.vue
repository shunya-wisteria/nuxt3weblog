<template>
  <template v-if="data">
    <Abount :about="(data as About)"></Abount>
  </template>
</template>
<script setup lang="ts">
import type { About } from '~/types/about';

const { data } = await useMicroCMSGetObject({endpoint:"about"});

useHead({
  title:"About"
})

</script>