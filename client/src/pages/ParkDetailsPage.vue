<script setup>
import { AppState } from '@/AppState.js';
import AlertCard from '@/components/globals/AlertCard.vue';
import ArticleCard from '@/components/globals/ArticleCard.vue';
import FeeCard from '@/components/globals/FeeCard.vue';
import HereMap from '@/components/globals/HereMap.vue';
import ToDoCard from '@/components/globals/ToDoCard.vue';
import Modalwrapper from '@/components/ModalWrapper.vue';
import { alertsService } from '@/services/AlertsService.js';
import { articlesService } from '@/services/ArticlesService.js';
import { followersService } from '@/services/FollowersService.js';
import { parksService } from '@/services/ParksService.js';
import { toDoService } from '@/services/ToDoService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const account = computed(() => AppState.account)
const park = computed(() => AppState.activePark)
const thingsToDo = computed(() => AppState.thingsToDo)
const alerts = computed(() => AppState.alerts)
const articles = computed(() => AppState.articles)
const fees = computed(() => AppState.activePark?.entranceFees)
const phoneNumbers = computed(() => AppState.activePark?.phoneNumbers)
const emails = computed(() => AppState.activePark?.emails)
const operatingHours = computed(() => AppState.activePark?.operatingHours)
const images = computed(() => AppState.activePark?.images)
const activeFee = ref(null)
const followers = computed(() => AppState.followers)
const activeContainer = ref(null)
const center = computed(() => {
  const lat = park.value?.latitude
  const lng = park.value?.longitude
  return { lat: lat, lng: lng }
})
let markersLoaded = false;

watch(center, () => {
  if (center.value) {
    AppState.mapMarkers.push(center.value);
    markersLoaded = true;
  }
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

onUnmounted(() => {
  AppState.mapMarkers = [];
  AppState.activePark = null;
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
      <section class="row justify-content-between">
        <div class="col-12 col-md-5 align-content-md-center">
          <div class="card mt-3 m-md-5 p-3">
            <h3>{{ park.fullName }}</h3>
            <span>{{ park.address.line1 }}</span>
            <span>{{ park.address.city }}, {{ park.address.stateCode }} {{ park.address.postalCode }}</span>
            <br />
            <p>{{ park.description }}</p>
          </div>
        </div>
        <div class="col-12 col-md-2 d-flex justify-content-center">
          <div class="m-md-5">
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
      </section>
    </div>
    <div v-if="markersLoaded">
      <HereMap :center="center" />
    </div>
    <div class="container">
      <section class="row">
        <div class="col-12">
          <div class="text-center">
            <button @click="activeContainer = 'parkAlerts'" class="btn">Alerts</button> |
            <button @click="activeContainer = 'articles'" class="btn">Articles</button> |
            <button @click="activeContainer = 'gallery'" class="btn">Gallery</button> |
            <button @click="activeContainer = 'parkInformation'" class="btn">Park Information</button> |
            <button @click="activeContainer = 'thingsToDo'" class="btn">Things To Do</button> |
          </div>
        </div>
      </section>
    </div>
    <br>

    <!-- // SECTION - GALLERY -->
    <div v-if="activeContainer == 'gallery'">
      <div v-if="images">
        <div class="container">
          <section class="row justify-content-center">
            <div class="col-12">
              <h3>Park Gallery</h3>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="masonry-layout">
                  <div class="masonry-item" v-for="image in images" :key="image.url">
                    <a :href="image.url">
                      <img :src="image.url + '?width=500'" :alt="image.title" class="img-fluid shadow"
                        title="Click to see full-size image!">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <br>
    </div>

    <!-- // SECTION - PARK INFORMATION -->
    <div v-if="activeContainer == null || activeContainer == 'parkInformation'">
      <div v-if="fees && fees != []">
        <div class="container">
          <Modalwrapper id="fee-card">
            <FeeCard v-if="activeFee" :activeFee />
          </Modalwrapper>
          <section class="row justify-content-center">
            <div class="col-12">
              <h3>Park Information</h3>
              <p v-if="operatingHours[0].description">{{ operatingHours[0].description }}</p>
              <h5>Weather</h5>
              <p v-if="park.weather" class="box">{{ park.weather }}</p>
            </div>
            <div class="col-12">
              <br>
              <h5>Park Fees</h5>
            </div>
            <div v-for="fee in fees" :key="fee.id" class="col-11 col-md-2 mb-3 mx-3 m-md-3 btn fee-btn">
              <div @click="activeFee = fee" data-bs-toggle="modal" data-bs-target="#fee-card">
                <div>{{ fee.title }}</div>
                <div>${{ fee.cost }}</div>
              </div>
            </div>
          </section>
          <section class="row">
            <div class="col-md-9">
              <br>
              <h5>Park Operating Hours</h5>
              <div class="container-fluid">
                <section class="row">
                  <div v-for="hours in operatingHours" :key="hours.id" class="col-6 col-md-3">
                    <span v-if="hours.name" class="fw-bold">{{ hours.name }}</span>
                    <div>Sunday: {{ hours.standardHours.sunday }}</div>
                    <div>Monday: {{ hours.standardHours.monday }}</div>
                    <div>Tuesday: {{ hours.standardHours.tuesday }}</div>
                    <div>Wednesday: {{ hours.standardHours.wednesday }}</div>
                    <div>Thursday: {{ hours.standardHours.thursday }}</div>
                    <div>Friday: {{ hours.standardHours.friday }}</div>
                    <div>Saturday: {{ hours.standardHours.saturday }}</div>
                    <br>
                  </div>
                </section>
              </div>
            </div>
            <div class="col-md-3">
              <br>
              <h5>Park Contact Information</h5>
              <div v-for="phoneNumber in phoneNumbers" :key="phoneNumber.phoneNumber">
                <p>Phone Number: {{ phoneNumber.phoneNumber }}</p>
              </div>
              <div v-for="email in emails" :key="email.emailAddress">
                <p>Email: {{ email.emailAddress }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- // SECTION - ARTICLES -->
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
      <br>
    </div>

    <!-- // SECTION - PARK ALERTS -->
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
      <br>
    </div>

    <!-- // SECTION - THINGS TO DO -->
    <div v-if="activeContainer == 'thingsToDo'">
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
      <br>
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

.box {
  overflow-wrap: break-word;
}

.fee-btn {
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-style: solid;
  border-width: 4px;
}

.masonry-layout {
  column-count: 4;
  /* Adjust the number of columns based on your design */
  column-gap: 1rem;
  /* Space between columns */
  width: 100%;
  /* Full width of the container */
}

.masonry-item {
  break-inside: avoid;
  /* Prevent items from splitting across columns */
  margin-bottom: 1rem;
  /* Space between items */
  // background-color: #f2f2f2;
  /* Example background color */
  // padding: 1rem;
  /* Padding inside items */
}

@media (max-width: 768px) {
  .masonry-layout {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .masonry-layout {
    column-count: 1;
  }
}
</style>

<style>
#fee-card .modal-body {
  padding: 8px;
  /* background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-style: solid; */
  /* border-width: 4px; */
  /* border-radius: 5%; */
}

#fee-card .modal-content {
  background-color: #2C4A1E;
}
</style>