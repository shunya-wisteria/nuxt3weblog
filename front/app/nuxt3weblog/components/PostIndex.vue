<template>
  <v-container class="main-cnt">
    <v-row align="center" justify="start">
      <v-col v-for="post in posts" :key="post.id" xl="4" lg="4" md="6"  cols="12" sm="12" xs="12">
        <nuxt-link :to="'/posts/' + post.id + '/'">
          <v-hover
            v-slot="{ isHovering, props }"
            open-delay="80"
          >
            <v-card
              :elevation="isHovering ? 12 : 2"
              :class="{ 'on-hover': isHovering }"
              class="mx-auto"
              height="430"
              v-bind="props">
              <v-img
                height="200px"
                v-bind:src="post.eyecatch == null ? '/noimage.jpg' : post.eyecatch.url"
                width=100%
                cover
              />
              <v-card-title class="postTitle textarea">{{ post.title }}</v-card-title>
              <v-card-text class="postAbstract textarea">{{ post.abstract }}</v-card-text>
              <v-card-text class="postFotter textarea">{{ dateFormat(post.publishedAt ? post.publishedAt: "") }}</v-card-text>
            </v-card>
          </v-hover>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface Props {
  posts: any;
}

const { posts } = defineProps<Props>();

</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .postTitle{
    font-size:120%;
    font-weight: 300;
    line-height: 150%;
    color: #444;
    height: 80px;
    padding: 10px 16px;
    white-space: unset;
    margin-bottom: 5px;
    margin-top: 3px;
  }
  .postAbstract
  {
    height:100px;
    padding: 0px 16px 5px 16px;
    font-weight: 300;
    color: #737373;
  }
  .postFotter
  {
    height: 40px;
    padding:0px 16px 5px 16px;
  }

  .main-cnt
  {
    width:95%;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>