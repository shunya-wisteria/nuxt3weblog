<template>
  <h1>Posts</h1>
  <PostIndex :posts="posts"/>
  <v-pagination v-model="page" :length="maxPage" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup lang="ts">
const route = useRoute();
const page = ref(Number(route.query.page) ? Number(route.query.page) : 1);

const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const postsData:any = [];

const totalCount = await useGetPostsCount({limit:1, offset:0}, {key:"postCnt"})

const maxPage = ref(Math.ceil(totalCount / pageLimit));
for(let i = 0; i<maxPage.value; i++)
{
  const posts = await useGetPostsPerPage(i, pageLimit, "", "")
  postsData.push(posts)

}
const posts = ref(postsData[page.value - 1]);

const refresh = (post:any) =>
{
  scrollTo(0, 0)
  posts.value = post
}

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/posts/",
    query: {page: page.value}
  })
}

useHead({
  title:"Posts"
})

watch(() => page.value, ()=> {refresh(postsData[page.value - 1])})


</script>