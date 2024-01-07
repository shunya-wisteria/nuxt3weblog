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

    <div style="margin-top:5px;" v-if="post.eyecatch != null">
      <img v-bind:src="post.eyecatch == null ? '' : post.eyecatch.url" v-if="post.eyecatch != null">
    </div>

    <div v-if="post.toc" class="textarea">
      <ul class="tocs blue-grey lighten-5">
        <span style="font-weight:600; font-size:120%;">目次</span>
        <li v-for="item in toc" :key="item.id" :class="'toc toc_' + item.name">
          <a :href="'#' + item.id" v-smooth-scroll="{ duration: 1000, offset: -90, updateHistory: false }">{{ item.text
          }}</a>
        </li>
      </ul>
    </div>

    <div v-html="post.body" style="margin-top:30px; " class="textarea"></div>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>

    <v-chip label v-bind:to="'/categories/' + (post.category == null ? '' : post.category.id)">
      <v-avatar left><v-icon light>mdi-folder-outline</v-icon></v-avatar>
      {{ post.category == null ? "" : post.category.cat_name }}
    </v-chip>

  </section>
</template>

<script setup lang="ts">
import { load } from 'cheerio';
import type { Post } from '~/types/post';

interface Props {
  post: Post,
}

const { post } = defineProps<Props>()

const toc = computed(() => {
  const $ = load(post.body as string)
  const headings = $('h2, h3').toArray();
  return headings.map(data => ({
    // @ts-ignore
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name
  }));
})

const breadcrumbs: any = [
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

<style scoped>
.tocs {
  background-color: #eceff1 !important;
  border-radius: 2px;
  filter: drop-shadow(3px 3px 3px #bbbbbb);
  padding: 15px 20px;
  margin: 20px 8px;
  width: 95%;
  max-width: 450px;
}

.toc {
  list-style-type: none;
  line-height: 200%;
}

.toc_h2 {
  margin-left: 5px;
}

.toc_h3 {
  margin-left: 15px;
}
</style>