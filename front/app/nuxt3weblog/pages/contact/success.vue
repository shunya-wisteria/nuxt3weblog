<template>
  <section class="postframe post">
      <h1>Thank you</h1>
      
      <v-breadcrumbs :items="breadcrumbs" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script setup>
const breadcrumbs = [
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: "Contact",
    disabled: true,
    href: ""
  },
]

useHead({
  title:"Contact"
})
</script>