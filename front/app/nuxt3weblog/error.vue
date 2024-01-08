<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>
        <span class="headline">
          <nuxt-link to="/" style="color:rgba(0, 0, 0, 0.87);border-bottom:none;">
            {{ pageInfo.title }}
          </nuxt-link>
        </span>
        <span class="subTitle">{{ pageInfo.subTitle }}</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <section class="post" style="height: 600px;">
        <h1>{{ statusCode }}</h1>
        <p class="text-center erMsg">{{ message }}</p>
        <p class="text-center erLink">
          <nuxt-link to="/" text="Back to home" />
        </p>

      </section>
    </v-main>

    <v-footer :absolute="true" height="120px">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} {{ pageInfo.author }}
      </v-col>
    </v-footer>

  </v-app>
</template>

<script setup lang="ts">
import type { PageInfo } from '~/types/pageinfo';

const error = useError();
// @ts-ignore
const statusCode = ref(error.value?.statusCode);
const message = ref(error.value?.message)

const { data } = await useMicroCMSGetObject({endpoint:"pageinfo"});
  const pageInfo = useState<PageInfo>('PageInfo', ()=>{
    return data.value as PageInfo
  })
</script>

<style scoped>
.headline{
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto,sans-serif!important;
  font-size: 1.5rem!important;
  font-weight: 400;
  letter-spacing: normal!important;
}
.subTitle
{
  font-weight: 100;
  font-size:80%; 
  margin-left:15px;
  font-family: "Roboto", sans-serif;
}

@media (max-width:530px)
{
  .subTitle{
    display: none;
  }
}

.v-main
{
  margin-bottom: 20px;
}

.v-footer
{
  font-family: "Roboto", 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
  font-weight: 600;
  color: #555555;
  background-color: #f5f5f5;
}

.erMsg{
  font-size:130%;
}

.erLink{
  margin-top:50px;
}
</style>