<template>
  <section class="postframe post">
    <h1 class="textarea">{{ post?.title }}</h1>

    <v-container>
      <v-row align="center" justify="center">
        <v-col xxl="4" xl="4" lg="4" md="4" sm="4" xs="12" cols="12" align="left" justigy="center" style="padding: 0px;">
          <span style="font-size:80%;" class="textarea"><v-icon style="font-size: 100%; padding-bottom: 1.5px; margin-right: 1px;">mdi-clock-time-four-outline</v-icon>{{ dateFormat(post?.publishedAt as string) }}</span>
          <span style="font-size:80%;" class="textarea"><v-icon style="font-size: 110%; padding-bottom: 2px; margin-left: 5px; margin-right: 1px;">mdi-update</v-icon>{{ dateFormat(post?.updatedAt as string) }}</span>
        </v-col>
        <v-col xxl="8" xl="8" lg="8" md="8" sm="8" xs="12" cols="12" align="right" justify="center">
          <v-chip v-for="(t, index) in (post.tags as any)" :key="index" :to="'/tags/' + t.id + '/'">
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
      <ul class="tocs bg-toc_bg text-main_text">
        <span style="font-weight:600; font-size:120%;">目次</span>
        <li v-for="item in toc" :key="item.id" :class="'toc toc_' + item.name">
          <a :href="'#' + item.id" v-smooth-scroll="{ duration: 1000, offset: -90, updateHistory: false }">{{ item.text
          }}</a>
        </li>
      </ul>
    </div>

    <div v-html="post.body" style="margin-top:30px; " class="textarea"></div>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>

    <v-chip label v-bind:to="'/categories/' + (post.category == null ? '' : post.category.id) + '/'">
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
    href: "/posts/"
  },
  {
    title: post.title,
    disabled: true,
    href: ""
  },
]

// インライン埋め込みブロックの初期読込
loadIframelyScript().then(initializeIframely)
function loadIframelyScript(){
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iframe.ly/embed.js';
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}
function initializeIframely() {
  // @ts-ignore
  if (window.iframel) {
    // @ts-ignore
    window.iframely.load();
  }
}

</script>

<style scoped>
.tocs {
  border-radius: 2px;
  filter: drop-shadow(2px 2px 4px rgb(var(--v-theme-filter)));
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