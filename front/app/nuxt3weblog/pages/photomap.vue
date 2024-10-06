<template>
  <section class="postframe post">
    <h1 class="textarea">Photomap</h1>
    <p>最近、訪問した場所の記録。</p>

    <div>
      <iframe width="100%" height="680" scrolling="no" frameborder="no" :src="url"></iframe>
    </div>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const url = ref(config.public.photomapUrl)

const breadcrumbs: any = [
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: "Photomap",
    disabled: true,
    href: ""
  },
]

useHead({
  title:"Photomap"
})
</script>