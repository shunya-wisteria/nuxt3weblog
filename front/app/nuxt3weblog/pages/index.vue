<template>
  <section>
    <v-img position="center center" :src="pageInfo.portalEyecatch?.url" rel="preload" height="350px" cover>
      <v-row class="fill-height" justify="center" align="center">
        <div class="introMsg">{{ pageInfo.portalEyecatchCom }}</div>
      </v-row>
    </v-img>

    <v-layout column justify="center" align="center">
      <v-container>
        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Quick Menu</p>
          </v-col>
          <v-col cols="4" class="topLinkColLeft">
            <a :href="pageInfo.topLink1?.url" :target="pageInfo.topLink1?.external ? '_blank' : '_self'">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <v-img :src="pageInfo.topLink1?.photo?.url" class="align-end" height="150" cover>
                    <v-card-title class="text-white text-left topLinkText"
                      v-text="pageInfo.topLink1?.title"></v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>

          <v-col cols="4" class="topLinkColCenter">
            <a :href="pageInfo.topLink2?.url" :target="pageInfo.topLink2?.external ? '_blank' : '_self'">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <v-img :src="pageInfo.topLink2?.photo?.url" class="align-end" height="150" cover>
                    <v-card-title class="text-white text-left topLinkText"
                      v-text="pageInfo.topLink2?.title"></v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>

          <v-col cols="4" class="topLinkColRight">
            <a :href="pageInfo.topLink3?.url" :target="pageInfo.topLink3?.external ? '_blank' : '_self'">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <v-img :src="pageInfo.topLink3?.photo?.url" class="align-end" height="150" cover>
                    <v-card-title class="text-white text-left topLinkText"
                      v-text="pageInfo.topLink3?.title"></v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </a>
          </v-col>

        </v-row>

        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Pickup</p>
          </v-col>
          <v-col cols="12">
            <nuxt-link :to="'/posts/' + pageInfo.pickupEntry?.id">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <v-container>
                    <v-row
                      align="center"
                      justify="start"
                    >
                      <v-col
                        cols="12"
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                      >
                        <div style="height:80px">
                          <v-card-title class="text-left textarea">{{ pageInfo.pickupEntry?.title }}</v-card-title>
                        </div>
                        <v-card-text class="text-left textarea">{{ pageInfo.pickupEntry?.abstract }}</v-card-text>
                      </v-col>
                      <v-col
                        cols="12"
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                      >
                        <v-img 
                          :src="pageInfo.pickupEntry?.eyecatch?.url" 
                          style="border:1px solid #EEEEEE; max-height:350px;"
                          cover
                        />
                      </v-col>

                    </v-row>
                  </v-container>
                </v-card>
              </v-hover>
            </nuxt-link>
          </v-col>
        </v-row>

        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Recent Posts</p>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>

    <PostIndex :posts="data?.contents" />

    <v-layout column justify="center" align="center">
      <v-container>
        <v-row align="center" justigy="center">
          <v-col cols=12 align="center" style="margin-top:20px;">
            <p>
              <nuxt-link to="/posts?page=2" class="more" style="font-size:120%;">Read More Posts</nuxt-link>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>

  </section>
</template>

<script setup lang="ts">
import type { Post } from "~~/types/post";
import type { PageInfo } from "~/types/pageinfo";

const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 5;

const { data } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: { limit: pageLimit, offset: 0 }
});

const pageInfo = ref(useState('PageInfo') as PageInfo);

</script>

<style scoped>
.introMsg {
  font-size: 150%;
  font-weight: 300;
  font-family: 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
  ;
  color: #ECEFF1;
  background-color: #8888;
  padding: 2px 15px;
  border-radius: 3px;
}

.secCaption {
  color: #444;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 15px
}

.secCaption:after,
.secCaption:before {
  content: "";
  flex-grow: 1;
  height: 1px;
  background: #444;
  display: block
}

.secCaption:before {
  margin-right: .8em;
  background: linear-gradient(-90deg, #888, transparent)
}

.secCaption:after {
  margin-left: .8em;
  background: linear-gradient(90deg, #888, transparent)
}

.topLink {
  margin-top: 20px;
  margin-bottom: 20px;
}

.topLinkText {
  font-size: 100%;
  -webkit-text-stroke: 0.1px #888888;
}

.topLinkTitleText {
  margin-top: 0px;
}

.topLinkTitle {
  padding-top: 0px;
  padding-bottom: 0px;
}

.topLinkColRight {
  padding-left: 2.5px;
}

.topLinkColCenter {
  padding-left: 2.5px;
  padding-right: 2.5px;
}

.topLinkColLeft {
  padding-right: 2.5px;
}
</style>