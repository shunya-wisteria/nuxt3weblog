<template>
  <h1>{{ category }}</h1>
  <PostIndex :posts="posts"/>
  <v-pagination v-model="page" :length="maxPage" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup>
const { params, query } = useRoute();
const config = useRuntimeConfig();

const page = ref(Number(query.page) ? Number(query.page) : 1);
const category = ref(params.id);
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const postsData = [];

const totalCount = await useGetPostsCount({limit:1, offset:0, filters:"category[equals]" + category.value},{key:"categoryCnt-" + category.value})

const maxPage = ref(Math.ceil(totalCount / pageLimit));
for(let i = 0; i<maxPage.value; i++)
{
  const posts = await useGetPostsPerPage(i, pageLimit, "", category.value)
  postsData.push(posts)

}
const posts = ref(postsData[page.value - 1]);

const refresh = (post) =>
{
  scrollTo(0, 0)
  posts.value = post
}

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/categories/" + category.value,
    query: {page: page.value}
  })
}

useHead({
  title:"Category : " + category.value
})

watch(() => page.value, ()=> {refresh(postsData[page.value - 1])})

</script>