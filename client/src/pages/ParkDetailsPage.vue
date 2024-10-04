<script setup>
import { AppState } from '@/AppState.js';
import AlertCard from '@/components/globals/AlertCard.vue';
import ArticleCard from '@/components/globals/ArticleCard.vue';
import FeeCard from '@/components/globals/FeeCard.vue';
import HereMap from '@/components/globals/HereMap.vue';
import ToDoCard from '@/components/globals/ToDoCard.vue';
import Modalwrapper from '@/components/Modalwrapper.vue';
import { alertsService } from '@/services/AlertsService.js';
import { articlesService } from '@/services/ArticlesService.js';
import { followersService } from '@/services/FollowersService.js';
import { parksService } from '@/services/ParksService.js';
import { toDoService } from '@/services/ToDoService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const account = computed(() => AppState.account)
const park = computed(() => AppState.activePark)
const thingsToDo = computed(() => AppState.thingsToDo)
const alerts = computed(() => AppState.alerts)
const articles = computed(() => AppState.articles)
const fees = computed(() => AppState.activePark.entranceFees)
const activeFee = ref(null)
const followers = computed(() => AppState.followers)
const activeContainer = ref(null)
const center = computed(() => {
  const lat = park.value.latitude
  const lng = park.value.longitude
  return { lat: lat, lng: lng }
})

const alreadyFollowing = computed(() => {
  const foundFollower = followers.value.find(follower => follower.creatorId == account.value?.id);
  if (foundFollower) {
    return true;
  } else {
    return false;
  }
})

onMounted(() => {
  getParkByCode()
  getFollowersByCode()
  getToDoByCode()
  getAlertByCode()
  getArticleByCode()
})

async function getParkByCode() {
  try {
    await parksService.getParkByCode(route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getToDoByCode() {
  try {
    await toDoService.getToDoByCode(route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getAlertByCode() {
  try {
    await alertsService.getAlertByCode(route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function getArticleByCode() {
  try {
    await articlesService.getArticleByCode(route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log
  }
}

async function getFollowersByCode() {
  try {
    await followersService.getFollowersByCode(route.params.parkCode);
  }
  catch (error) {
    Pop.error(error);
  }
}

async function createFollower() {
  try {
    await followersService.createFollower(route.params.parkCode);
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteFollower() {
  try {
    const foundFollower = followers.value.find(follower => follower.creatorId == account.value?.id);
    await followersService.deleteFollower(foundFollower.id);
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div v-if="park">
    <div :style="{ backgroundImage: 'url(' + park.images[0].url + ')' }" class="container-fluid bg-hero d-flex">
      <section class="row">
        <div class="align-content-center justify-content-between d-flex">
          <div class="col-md-5">
            <div class="card m-5 p-3">
              <h3>{{ park.fullName }}</h3>
              <span>{{ park.address.line1 }}</span>
              <span>{{ park.address.city }}, {{ park.address.stateCode }} {{ park.address.postalCode }}</span>
              <br />
              <p>{{ park.description }}</p>
            </div>
          </div>
          <div class="m-5">
            <div class="col-md-2">
              <button v-if="!alreadyFollowing" @click="createFollower()" class="btn follow-btn">
                <i class="mdi mdi-heart-outline fs-4"></i>
                <p class="m-0">Follow</p>
              </button>
              <button v-if="alreadyFollowing" @click="deleteFollower()" class="btn follow-btn">
                <i class="mdi mdi-heart fs-4"></i>
                <p class="m-0">Unfollow</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="park">
      <HereMap :center="center" />
    </div>
    <div class="container">
      <section class="row">
        <div class="col-12">
          <div class="text-center">
            <button @click="activeContainer = 'parkAlerts'" class="btn">Alerts</button> |
            <button @click="activeContainer = 'articles'" class="btn">Articles</button> |
            <button @click="activeContainer = 'parkInformation'" class="btn">Park Information</button> |
            <button @click="activeContainer = 'thingsToDo'" class="btn">Things To Do</button> |
          </div>
        </div>
      </section>
    </div>
    <div v-if="activeContainer == 'parkInformation'">
      <div v-if="fees">
        <div class="container">
          <Modalwrapper id="fee-card">
            <FeeCard v-if="activeFee" :activeFee />
          </Modalwrapper>
          <section class="row">
            <div class="col-12">
              <h3>Park Information</h3>
            </div>
            <div class="col-4">
              <h5>Park Fees</h5>
              <div v-for="fee in fees" :key="fee.id">
                <button @click="activeFee = fee" data-bs-toggle="modal" data-bs-target="#fee-card"
                  class="btn bg-info p-0 order-0 w-100">
                  <div>{{ fee.title }} : ${{ fee.cost }}</div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-if="activeContainer == 'articles'">
      <div v-if="articles">
        <div class="container">
          <section class="row">
            <div class="col-12">
              <h3>Articles</h3>
            </div>
            <div v-for="article in articles" :key="article.id">
              <ArticleCard :article />
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-if="activeContainer == 'parkAlerts'">
      <div v-if="alerts">
        <div class="container">
          <section class="row">
            <div class="col-12">
              <h3>Alerts</h3>
            </div>
            <div v-for="alert in alerts" :key="alert.id">
              <AlertCard :alert />
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-if="activeContainer == null || activeContainer == 'thingsToDo'">
      <div v-if="thingsToDo">
        <div class="container">
          <section class="row">
            <div class="col-12">
              <h3>Things To Do</h3>
            </div>
            <div v-for="toDo in thingsToDo" :key="toDo.id">
              <ToDoCard :toDo />
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bg-hero {
  height: 87vh;
  background-size: cover;
  background-position: center;
}

.card {
  background-color: rgba(0, 0, 0, 0.334);
  color: white;
  border: none;
}

.follow-btn {
  background-color: rgba(0, 0, 0, 0.334);
  color: white;
}
</style>