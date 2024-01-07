<template>
  <section class="post">
    <h1 class="textarea">{{ post?.title }}</h1>

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="4" align="left" justigy="center">
          <span style="font-size:90%;" class="textarea">{{ dateTime(post?.publishedAt as string) }}</span>
        </v-col>
        <v-col cols="8" align="right" justify="center">
          <v-chip v-for="(t, index) in (post.tags as any)" :key="index" :to="'/tags/' + t.id">
            <v-avatar left>
              <v-icon light style="padding-top:3px;">mdi-tag-outline</v-icon>
            </v-avatar>
            {{ t ? t.name : "" }}
          </v-chip>
        </v-col>

      </v-row>
    </v-container>

    <div style="width:90%;max-width: 1000px; margin:0 auto; margin-top:5px;" v-if="post.eyecatch != null">
      <img v-bind:src="post.eyecatch == null ? '' : post.eyecatch.url" v-if="post.eyecatch != null">
    </div>

    <div v-html="post.body" style="margin-top:30px; " class="textarea"></div>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>

    <v-chip 
      label
      v-bind:to="'/categories/' + (post.category == null ? '' : post.category.id)"
    >
      <v-avatar left><v-icon light>mdi-folder-outline</v-icon></v-avatar>
      {{post.category == null ? "" : post.category.cat_name}}
    </v-chip>

  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';

interface Props {
  post: Post,
}

const { post } = defineProps<Props>()

// const breadcrumbs = computed(() => {
//   return [
//     {
//       title: "Home",
//       disabled: false,
//       href: "/"
//     },
//     {
//       title: "Posts",
//       disabled: false,
//       href: "/posts"
//     },
//     {
//       title: post.title,
//       disabled: true,
//       href: ""
//     },
//   ]
// })
const breadcrumbs:any = [
    {
      title: "Home",
      disabled: false,
      href: "/"
    },
    {
      title: "Posts",
      disabled: false,
      href: "/posts"
    },
    {
      title: post.title,
      disabled: true,
      href: ""
    },
  ]

</script>