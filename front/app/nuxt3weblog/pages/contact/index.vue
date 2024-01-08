<template>
  <section class="post">
      <h1>Contact</h1>

      <div style="margin:20px 0px;">
          <p class="textarea">当サイトへのお問い合わせはこちらからどうぞ。</p>
      </div>

      <v-form style="margin:30px 0px;" name="contact" method="POST" action="/contact/success/" data-netlify="true">
          <v-text-field
              label="お名前"
              required
              color="blue-grey lighten-1"
              name="name"
          ></v-text-field>
          <v-text-field
              label="メールアドレス"
              required
              color="blue-grey lighten-1"
              name="email"
          ></v-text-field>
          <v-text-field
              label="件名"
              color="blue-grey lighten-1"
              name="title"
          ></v-text-field>
          <v-textarea
              label="本文"
              color="blue-grey lighten-1"
              name="body"
          ></v-textarea>
        <!-- <v-btn depressed large color="grey lighten-1" width="100%" type="submit">送信</v-btn> -->
        <v-btn depressed large color="grey-lighten-2" width="100%" type="submit">送信</v-btn>
      </v-form>
      
      <v-breadcrumbs :items="breadcrumbs" style="padding:30px 5px 30px 5px;"></v-breadcrumbs>
  </section>
</template>

<script setup>
const breadcrumbs = [
  {
    title: "Home",
    disabled: false,
    href: "/"
  },
  {
    title: "Contact",
    disabled: true,
    href: ""
  },
]

useHead({
  title:"Contact"
})
</script>