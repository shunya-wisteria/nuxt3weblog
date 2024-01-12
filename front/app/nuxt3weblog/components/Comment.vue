<template>
  <section class="post">
    <p class="comTitle">Comments</p>
    <v-text-field label="お名前(必須)" required color="blue-grey lighten-1" v-model="input.name"
      variant="underlined"></v-text-field>
    <v-text-field label="コメント(必須)" required color="blue-grey lighten-1" v-model="input.comment"
      variant="underlined"></v-text-field>
    <v-btn depressed large color="blue-grey-lighten-2" width="100%" v-on:click="OnSend()">送信</v-btn>

    <v-container class="commentList">
      <v-row>
        <v-col cols="12" class="comment" v-for="(comment, index) in comments" :key="index">
          <p class="commentBody">{{ comment.comment }}</p>
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

const OnSend = async () => {
  if (input.value.name == "" || input.value.name == null) {
    window.alert("お名前 を入力してください。")
    return
  }
  else if (input.value.comment == "" || input.value.comment == null) {
    window.alert("コメント を入力してください。")
    return
  }
  const submitParams = new FormData()
  submitParams.append(config.public.formNameField, input.value.name);
  submitParams.append(config.public.formEmailField, "xxx@example.com");
  submitParams.append(config.public.formCommentField, input.value.comment);
  submitParams.append(config.public.formEntryidField, entryId);

  if(await usePostComment(submitParams))
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
  color: #444;
}

.commentList {
  margin-top: 20px;
}

.comment {
  background-color: #f5f5f5;
  border: solid 1px #ececec;
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