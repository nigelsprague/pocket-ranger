<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { followersService } from '@/services/FollowersService.js';
import { logger } from '@/utils/Logger.js';
import { parksService } from '@/services/ParksService.js';
import { articlesService } from '@/services/ArticlesService.js';
import ArticleCard from '@/components/globals/ArticleCard.vue';

onMounted(() => {
  getFavoriteParks()
  getArticleByFavorites()
})

const account = computed(() => AppState.account)
const favoritedParks = computed(() => AppState.favoritedParks)
const articles = computed(() => AppState.articles)

async function getFavoriteParks() {
  try {
    const codes = await followersService.getAccountFollows()
    logger.log(codes)
    await parksService.getFavoriteParks(codes)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getArticleByFavorites() {
  try {
    const codes = await followersService.getAccountFollows()
    await articlesService.getArticleByCode(codes)
  }
  catch (error) {
    Pop.error(error)
    logger.log
  }
}
</script>

<template>
  <div class="about">
    <div v-if="account">
      <!-- <div class="text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div> -->

      <div class="d-flex bg-primary px-3 p-2 align-items-center justify-content-between">
        <h3 class="text-start text-offwhite">Welcome {{ account.name }}</h3>
        <div>
          <button class="btn mdi mdi-map fs-2 text-offwhite p-0 px-1" title="My Parks"></button>
          <button class="btn mdi mdi-bookmark-outline fs-2 text-offwhite p-0 px-1" title="Bookmarked Articles"></button>
          <button class="btn mdi mdi-camera-outline fs-2 text-offwhite p-0 px-1" title="My Gallery"></button>
          <button class="btn mdi mdi-heart-outline fs-2 text-offwhite p-0 px-1" title="Liked Posts"></button>
          <button class="btn mdi mdi-cog-outline fs-2 text-offwhite p-0 px-1" title="My Park Alerts"></button>
        </div>
      </div>

      <div class="container mt-2">
        <section class="row justify-content-end">
          <div class="col-md-3 text-end">
            <h4>Notifications</h4>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="alerts" checked />
              <label class="form-check-label" for="alerts">Alerts</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="community" checked />
              <label class="form-check-label" for="community">Community</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="articles" checked />
              <label class="form-check-label" for="articles">Articles</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="events" checked />
              <label class="form-check-label" for="events">Events</label>
            </div>
          </div>
        </section>
        <section class="row align-items-baseline justify-content-between text-forest fs-5">
          <div class="col-md-6">
            <h4>Favorited Parks</h4>
            <hr />
            <div v-for="park in favoritedParks" :key="park.parkCode" class="col-12 mb-3">
              <ParkCard :park="park" />
            </div>
          </div>
          <div class="col-md-6">
            <h4>Park Articles</h4>
            <hr />
            <section class="row">
              <div v-for="article in articles" :key="article.id" class="col-12 article mb-2">
                <ArticleCard :article />
              </div>
            </section>
          </div>

        </section>
      </div>
    </div>

    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}

.form-check-input {
  background-color: var(--offwhite);
}

.form-check-input:checked {
  background-color: var(--bs-secondary);
  border-color: var(--bs-secondary);
}

.article {
  width: 100%;
}
</style>
