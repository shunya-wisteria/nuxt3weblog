<template>
  <v-app id="inspire" :theme="themeName" class="bg-background text-main_text">
    <v-navigation-drawer
      expand-on-hover
      :rail="!mdAndDown"
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menuItem"
          :key="i"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" style="color:rgb(var(--v-theme-menu_text));" />
          </template>
          <v-list-item-title v-text="item.title" style="color:rgb(var(--v-theme-menu_text));"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="mdAndDown"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="headline">
          <nuxt-link to="/" style="color:inherit;border-bottom:none;">
            {{ pageInfo.title }}
          </nuxt-link>
        </span>
        <span class="subTitle">{{ pageInfo.subTitle }}</span>
      </v-app-bar-title>
      <template v-slot:append>
        <client-only>
          <v-switch v-model="isDark" style="margin-top:25px; margin-right: 5px;" :append-icon="themeIcon"></v-switch>
        </client-only>
      </template> 
    </v-app-bar>

    <v-main>
        <NuxtPage />
    </v-main>

    <v-footer
      :absolute="true"
      height="120px"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} {{ pageInfo.author }}
      </v-col>
    </v-footer>

  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PageInfo } from '~/types/pageinfo';

const { mdAndDown } = useDisplay();

const drawer = ref(false)

let pageInfoData = null
try {
  const { data } = await useMicroCMSGetObject({endpoint:"pageinfo"});
  pageInfoData = data.value
} catch (e) {
  console.error('useMicroCMSGetObject failed', e)
}
const pageInfo = useState<PageInfo>('PageInfo', ()=>{
  return pageInfoData as PageInfo
})

// use nuxt-color-mode composable (provided by @nuxtjs/color-mode)
const colorMode = useColorMode()

// sync with Vuetify theme (client only)
if (process.client) {
  try {
    const { useTheme } = await import('vuetify')
    const vuetifyTheme = useTheme()
    watch(() => colorMode.value, (val) => {
      if (vuetifyTheme && vuetifyTheme.global && vuetifyTheme.global.name) {
        vuetifyTheme.global.name.value = val as string
      }
    }, { immediate: true })
  } catch (e) {
    console.error('Vuetify theme sync skipped', e)
  }
}

watch(() => colorMode.value, (val) => {
  const newVal = localStorage.getItem("display_mode")
  if(newVal != null)
  {
    colorMode.value = newVal 
  }
})

const isDark = computed({
  get(){
    return colorMode.value === 'dark';
  },
  set(v:string){
    const newVal = v ? 'dark' : 'light'
    colorMode.value = newVal
    if (process.client) {
      try { 
        localStorage.setItem('display_mode', newVal) 
      } catch (e) { /* ignore */ }
    }
  }
})

// expose theme name for v-app binding
const themeName = computed(() => colorMode.value)
const themeIcon = computed(()=>{
  return isDark.value ? 'mdi-weather-night' : 'mdi-weather-sunny'
})

const menuItem = ref(
  [
      {
        icon: 'mdi-home-outline',
        title: 'Home',
        to: '/'
      },
      {
        icon: 'mdi-account-details-outline',
        title: 'About',
        to: '/about/'
      },
      {
        icon: 'mdi-folder-outline',
        title: 'Categories',
        to: '/categories/'
      },
      {
        icon: 'mdi-tag-outline',
        title: 'Tags',
        to: '/tags/'
      },
      {
        icon: 'mdi-map-marker-check-outline',
        title: 'PhotoMAP',
        to: '/photomap/'
      },
      {
        icon: 'mdi-at',
        title: 'Contact',
        to: '/contact/'
      }
    ]
)

</script>

<style scoped>
.headline{
  color: rgb(var(--v-theme-page_title));
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

.navicon{
  display: block;
}

@media (max-width:530px)
{
  .subTitle{
    display: none;
  }
}

@media (min-width: 1280px)
{
  .navicon{
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
  color: rgb(var(--v-theme-footer_text));
  background-color: rgb(var(--v-theme-footer_bg));
}
</style>