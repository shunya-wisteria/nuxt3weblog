<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      expand-on-hover
      rail
      v-model="drawer"
    > -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="headline">Title</span>
        <span class="subTitle">subtitle</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <div class="main-cnt">
        <NuxtPage />
      </div>
        
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)
</script>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
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

.main-cnt
{
  width:95%;
  max-width: 1500px;
  background-color: #e0e0e0;
  margin: 0 auto;
}
</style>