<template>
  <section>
    <div class="eyecatch-wrapper">
      <img
        :src="pageInfo.portalEyecatch?.url"
        alt="eyecatch"
        class="eyecatch-img"
        fetchpriority="high"
        loading="eager"
      />
      <div class="eyecatch-overlay">
        <div class="introMsg">{{ pageInfo.portalEyecatchCom }}</div>
      </div>
    </div>


    <v-layout column justify="center" align="center">
      <v-container>
        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Quick Menu</p>
          </v-col>
          <v-col cols="4" class="topLinkColLeft">
            <a :href="pageInfo.topLink1?.url" target="_blank" v-if="pageInfo.topLink1?.external">
            <nuxt-link :to="pageInfo.topLink1?.url" v-if="!pageInfo.topLink1?.external"></nuxt-link>
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink1?.photo?.url"
                      :alt="pageInfo.topLink1?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink1?.title }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-hover>
            </a>
            <nuxt-link :to="pageInfo.topLink1?.url" v-if="!pageInfo.topLink1?.external">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink1?.photo?.url"
                      :alt="pageInfo.topLink1?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink1?.title }}
                      </div>
                    </div>
                  </div>


                </v-card>
              </v-hover>
            </nuxt-link>
          </v-col>

          <v-col cols="4" class="topLinkColCenter">
            <a :href="pageInfo.topLink2?.url"  target="_blank" v-if="pageInfo.topLink2?.external">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink2?.photo?.url"
                      :alt="pageInfo.topLink2?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink2?.title }}
                      </div>
                    </div>
                  </div>

                </v-card>
              </v-hover>
            </a>
            <nuxt-link :to="pageInfo.topLink2?.url" v-if="!pageInfo.topLink2?.external">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink2?.photo?.url"
                      :alt="pageInfo.topLink2?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink2?.title }}
                      </div>
                    </div>
                  </div>

                </v-card>
              </v-hover>
            </nuxt-link>
          </v-col>

          <v-col cols="4" class="topLinkColRight">
            <a :href="pageInfo.topLink3?.url" target="_blank" v-if="pageInfo.topLink3?.external">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink3?.photo?.url"
                      :alt="pageInfo.topLink3?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink3?.title }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-hover>
            </a>
            <nuxt-link :to="pageInfo.topLink3?.url" v-if="!pageInfo.topLink3?.external">
              <v-hover v-slot="{ isHovering, props }" open-delay="80">
                <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props">
                  <div class="toplink-wrapper">
                    <img
                      :src="pageInfo.topLink3?.photo?.url"
                      :alt="pageInfo.topLink3?.title + ' へのリンク画像'"
                      class="toplink-img"
                    />

                    <div class="toplink-overlay">
                      <div class="v-card-title text-white text-left topLinkText">
                        {{ pageInfo.topLink3?.title }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-hover>
            </nuxt-link>
          </v-col>

        </v-row>

        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Pickup</p>
          </v-col>
          <v-col cols="12">
            <nuxt-link :to="'/posts/' + pageInfo.pickupEntry?.id + '/'">
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
                          <v-card-title class="text-left textarea" style="white-space: unset;">{{ pageInfo.pickupEntry?.title }}</v-card-title>
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
              <nuxt-link to="/postsList/2/" class="more" style="font-size:120%;">Read More Posts</nuxt-link>
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

useHead({
  title:pageInfo.value.title,
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: pageInfo.value.portalEyecatch?.url
    }
  ]

});

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
  color: rgb(var(--v-theme-post_title));
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

.eyecatch-wrapper {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
}

.eyecatch-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom center;
  display: block;
}

.eyecatch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -15px;
}

.toplink-wrapper {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.toplink-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

.toplink-overlay {
  position: absolute;
  bottom: 0; 
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>