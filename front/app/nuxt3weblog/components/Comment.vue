<template>
  <section class="postframe post">
    <p class="comTitle">Comments</p>
    <v-text-field label="お名前(必須)" required color="blue-grey lighten-1" v-model="input.name"
      variant="underlined" class="textarea"></v-text-field>
    <v-textarea label="コメント(必須)" required color="blue-grey lighten-1" v-model="input.comment"
      variant="underlined" class="textarea"></v-textarea>
    <v-btn depressed large color="blue-grey-lighten-2" width="100%" v-on:click="OnSend()">送信</v-btn>

    <v-container class="commentList">
      <v-row>
        <v-col cols="12" class="comment" v-for="(comment, index) in comments" :key="index">
          <p class="commentBody textarea" v-html="sanitizeComment(comment.comment).replace(/\r?\n/g, '<br>')"></p>
          <p class="commentFooter">{{ comment.name }} - {{ dateTime(comment.tstmp) }}</p>
        </v-col>
      </v-row>
    </v-container>


  </section>
</template>

<script setup lang="ts">
interface Props {
  entryId: string,
}


const config = useRuntimeConfig();
const { entryId } = defineProps<Props>();
const input = ref({ name: "", comment: "" })

const comments = ref()
useGetComments(entryId).then((comData) => {
  comments.value = comData
})

const sanitizeComment = (input: string): string => {
  return input
    .replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '')
    .replace(/\//g, '')
}

const OnSend = async () => {
  if (input.value.name == "" || input.value.name == null) {
    window.alert("お名前 を入力してください。")
    return
  }
  else if (input.value.comment == "" || input.value.comment == null) {
    window.alert("コメント を入力してください。")
    return
  }

  const comReq = {
    name : input.value.name,
    mail : "xxx@example.com",
    comment : sanitizeComment(input.value.comment),
    entryId : entryId
  };
  if(await usePostComment(comReq))
  {
    window.alert("コメントを送信しました。");
    input.value.name = "";
    input.value.comment = "";

    comments.value = await useGetComments(entryId);

    return;
  }
  window.alert("コメント送信に失敗しました。");
  return;
}


</script>

<style scoped>
.comTitle {
  font-size: 120%;
  color: rgb(var(--v-theme-post_title));
}

.commentList {
  margin-top: 20px;
}

.comment {
  background-color: rgb(var(--v-theme-comment_bg));
  border: solid 1px rgb(var(--v-theme-comment_border));
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0px;
  /* padding: 10px;
  margin: 8px 10px; */
}

.commentBody {
  font-size: 90%;
  margin-left: 0px;
  margin-bottom: 0px;
}

.commentFooter {
  font-size: 80%;
  text-align: right;
  margin-bottom: 0px;
}
</style>