<template>
  <h1>Posts</h1>
  <PostIndex :posts="posts"/>
  <v-pagination v-model="page" :length="maxPage" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup lang="ts">
const route = useRoute();
// const page = ref(Number(route.query.page) ? Number(route.query.page) : 1);
const page = ref(Number(route.params.page) ? Number(route.params.page) : 1);

const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const totalCount = await useGetPostsCount({limit:1, offset:0}, {key:"postCnt"})
const maxPage = ref(Math.ceil(totalCount / pageLimit));


const posts = ref(await useGetPostsPerPage(page.value - 1, pageLimit, "", ""));

const refresh = (post:any) =>
{
  scrollTo(0, 0)
  posts.value = post
}

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/postsList/" + page.value + "/",
  })
}

useHead({
  title:"Posts（" + page.value +"/" + maxPage.value + ")"
})



</script>