<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { followersService } from '@/services/FollowersService.js';
import { logger } from '@/utils/Logger.js';
import { parksService } from '@/services/ParksService.js';
import { articlesService } from '@/services/ArticlesService.js';
import ArticleCard from '@/components/globals/ArticleCard.vue';
import AlertCard from '@/components/globals/AlertCard.vue';
import { alertsService } from '@/services/AlertsService.js';
import { bookmarksService } from '@/services/BookmarksService.js';

onMounted(() => {
  getFavoriteParks()
  getArticleByFavorites()
  getAlertsByCode()
  getAccountBookmarks()
})

const account = computed(() => AppState.account)
const favoritedParks = computed(() => AppState.favoritedParks)
const articles = computed(() => AppState.articles)
const alerts = computed(() => AppState.alerts);

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

async function getAccountBookmarks() {
  try {
    const bookmarks = await bookmarksService.getAccountBookmarks()
    logger.log('Getting bookmarks', bookmarks)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
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

async function getAlertsByCode() {
  try {
    const codes = await followersService.getAccountFollows();
    await alertsService.getAlertByCode(codes);
  }
  catch (error) {
    Pop.error(error);
  }
}

function changeVisible(elemId) {
  let elem = document.getElementById(elemId);
  let activeElem = document.getElementsByClassName('active')[0];
  activeElem.classList.remove('active');
  activeElem.classList.add('hidden');
  elem.classList.remove('hidden');
  elem.classList.add('active')
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
          <button class="btn mdi mdi-map fs-2 text-offwhite p-0 px-1" title="My Parks"
            @click="changeVisible('favorited-parks')"></button>
          <!-- <button class="btn mdi mdi-bookmark-outline fs-2 text-offwhite p-0 px-1" title="Bookmarked Articles" @click="changeVisible'"bookmarked-articles')"></button> -->
          <!-- <button class="btn mdi mdi-camera-outline fs-2 text-offwhite p-0 px-1" title="My Gallery"></button> -->
          <!-- <button class="btn mdi mdi-heart-outline fs-2 text-offwhite p-0 px-1" title="Liked Posts"></button> -->
          <button class="btn mdi mdi-cog-outline fs-2 text-offwhite p-0 px-1" title="My Park Alerts"
            @click="changeVisible('notification-settings')"></button>
        </div>
      </div>
      <!--STUB Favorited Parks -->
      <div class="container-fluid">
        <section class="row justify-content-center pb-3 mb-3 pt-3 bg-offwhite">
          <div id="favorited-parks" class="col-12 active">
            <h4>Favorited Parks</h4>
            <div class="park-cont">
              <div v-for="park in favoritedParks" :key="park.parkCode" class="park">
                <ParkCard :park="park" />
              </div>
            </div>
          </div>
          <!--STUB Notification settings-->
          <div id="notification-settings" class="hidden col-md-3 text-end">
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
      </div>
      <div class="container">
        <section class="row align-items-baseline justify-content-between text-forest fs-5">
          <div class="col-md-6">
            <h4>Alerts</h4>
            <hr />
            <div v-for="alert in alerts" :key="alert.id" class="col-12 mb-3">
              <AlertCard :alert="alert" />
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

.park-cont {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1em;
  background-color: var(--bs-page);
  padding: 1em;
  border: 1px solid var(--bs-secondary);
}

.park {
  min-width: 30%;
  max-width: 30%;
}

.bg-offwhite {
  background-color: var(--offwhite);
}

.hidden {
  display: none;
}

@media (max-width: 768px) {
  .park {
    min-width: 50%;
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .park-cont {
    flex-direction: column;
    align-items: center;
  }

  .park {
    min-width: 90%;
    max-width: 90%;
  }
}
</style>
