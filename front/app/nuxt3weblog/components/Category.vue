<template>
  <section class="post">
    <h1 class="textarea">Categories</h1>

    <v-layout
      column
    >
      <v-container>
        <v-row>
          <v-col
             cols="12" 
             align="center"
          >
          <v-chip
            v-for="(cat,index) in category"
            :key="index"
            v-bind:to="'/categories/' + cat.id"
            label
          >
            <v-avatar left>
              <v-icon light>mdi-folder-outline</v-icon>
            </v-avatar>
            {{cat.cat_name}}
          </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>

    <v-breadcrumbs :items="(breadcrumbs)" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script setup lang="ts">
interface Props{
  category : any
}

const { category } = defineProps<Props>();

const breadcrumbs: any = [
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: "Categories",
    disabled: true,
    href: ""
  },
]

</script>