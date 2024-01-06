<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col v-for="post in posts" :key="post.id" xl="3" lg="4" md="6"  cols="6" sm="12" xs="12">
        <nuxt-link :to="'/posts/' + post.id">
        <v-hover
          v-slot="{ isHovering, props }"
          open-delay="100"
        >
          <v-card
            :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }"
            class="mx-auto"
            height="400"
            v-bind="props">
            <v-img
              height="180px"
              v-bind:src="post.eyecatch == null ? '/noimage.jpg' : post.eyecatch.url"
              width=100%;
              cover
            />
            <v-card-title class="postTitle textarea">{{ post.title }}</v-card-title>
            <v-card-text class="postAbstract textarea">{{ post.abstract }}</v-card-text>
            <v-card-text class="postFotter textarea">{{ post.publishedAt }}</v-card-text>
          </v-card>
        </v-hover>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Post } from "../types/post"

interface Props {
  posts: Post[];
}

const { posts } = defineProps<Props>();

</script>

<style scoped>
  .postTitle{
    font-size:120%;
    font-weight: 300;
    line-height: 150%;
    color: #444;
    height: 80px;
    padding: 10px 16px;
  }
  .postAbstract
  {
    height:100px;
    padding: 0px 16px 5px 16px;
    font-weight: 300;
  }
  .postFotter
  {
    height: 40px;
    padding:0px 16px 5px 16px;
  }
</style>