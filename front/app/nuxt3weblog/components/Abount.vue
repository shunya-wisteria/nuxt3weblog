<template>
  <section class="postframe about">
    <h1 class="textarea">About</h1>
    <div v-html="about.about" class="textarea" />

    <h2>Author</h2>
    <v-img
      v-bind:src="about.prof?.url"
      class="my-3 profile"
      contain
    >
    </v-img>
    <h3>{{ about.author }}</h3>
    <div  v-html="about.desc" class="textarea" />

    <div class ="sns">
      <p v-for="sns in about.sns">
        <a v-bind:href="sns?.url" target="_blank">
          <v-icon light>
            {{ sns?.mdicon }}
          </v-icon>
          {{ sns?.text }}
        </a>
        
      </p>
    </div>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script setup lang="ts">
import type { About } from '~/types/about';

interface Props{
  about: About
}

const { about } = defineProps<Props>();

const breadcrumbs: any = [
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: "About",
    disabled: true,
    href: ""
  },
]
</script>

<style scoped>
  * >>> .sns{
    width:300px;
    margin:0 auto;
    margin-top:50px;
    line-height: 250%;
  }

  .profile{
    width:150px;
    height:150px;
    border-radius:50%;
    margin: 0 auto;
  }
</style>