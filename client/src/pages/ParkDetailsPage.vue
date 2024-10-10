<script setup>
import { AppState } from '@/AppState.js';
import AlertCard from '@/components/globals/AlertCard.vue';
import ArticleCard from '@/components/globals/ArticleCard.vue';
import FeeCard from '@/components/globals/FeeCard.vue';
import HereMap from '@/components/globals/HereMap.vue';
import ReviewCard from '@/components/globals/ReviewCard.vue';
import ReviewForm from '@/components/globals/ReviewForm.vue';
import ToDoCard from '@/components/globals/ToDoCard.vue';
import Modalwrapper from '@/components/ModalWrapper.vue';
import { MapMarker } from '@/models/MapMarker.js';
import { alertsService } from '@/services/AlertsService.js';
import { articlesService } from '@/services/ArticlesService.js';
import { followersService } from '@/services/FollowersService.js';
import { parksService } from '@/services/ParksService.js';
import { reviewsService } from '@/services/ReviewsService.js';
import { toDoService } from '@/services/ToDoService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const currentPage = computed(() => AppState.displayCurrentPage)
const totalPages = computed(() => AppState.totalPages)
const account = computed(() => AppState.account)
const park = computed(() => AppState.activePark)
const reviews = computed(() => AppState.reviews)
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
// const center = computed(() => {
//   const lat = park.value?.latitude
//   const lng = park.value?.longitude
//   return { lat: lat, lng: lng }
// })
const center = computed(() => {
  if (park.value) {
    return new MapMarker(park.value)
  }
  return null
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
  getReviewsByPark()
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
    Pop.toast("You're now following this park!", 'success', 'top')
  }
  catch (error) {
    Pop.error('Log in to follow park', error)
  }
}

async function deleteFollower() {
  try {
    const foundFollower = followers.value.find(follower => follower.creatorId == account.value?.id);
    await followersService.deleteFollower(foundFollower.id);
    Pop.toast("You're no longer following this park", 'success', 'top')
  }
  catch (error) {
    Pop.error(error);
  }
}

async function changeArticlePage(pageNumber) {
  try {
    await articlesService.changeArticlesPage(pageNumber, route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
  }
}

async function getReviewsByPark() {
  try {
    await reviewsService.getReviewsByPark(route.params.parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

</script>


<template>
  <div v-if="park">
    <div :style="{ backgroundImage: 'url(' + park.images[0].url + ')' }" class="container-fluid bg-hero d-flex">
      <section class="row">
        <div class="col-12 col-lg-9 align-content-center">
          <div class="card bg-card m-md-5 p-3">
            <div class="container-fluid">
              <section class="row">
                <div
                  class="col-12 col-md-7 p-0 d-flex justify-content-center justify-content-md-start order-1 order-md-0">
                  <h3 class="align-content-center">{{ park.fullName }}</h3>
                </div>
                <div
                  class="col-12 col-md-5 d-flex p-0 justify-content-center justify-content-md-end align-items-center order-0 order-md-1">
                  <div v-if="account">
                    <button v-if="!alreadyFollowing" @click="createFollower()" class="btn follow-btn">
                      <i class="mdi mdi-heart-outline fs-5 fs-md-4"></i>
                      <p class="m-0">Follow</p>
                    </button>
                    <button v-if="alreadyFollowing" @click="deleteFollower()" class="btn follow-btn">
                      <i class="mdi mdi-heart fs-5 fs-md-4"></i>
                      <p class="m-0">Unfollow</p>
                    </button>
                  </div>
                  <RouterLink :to="{ name: 'Park Community' }">
                    <button class="btn follow-btn">
                      <i class="mdi mdi-account-group-outline fs-5 fs-md-4"></i>
                      <p class="m-0">Community</p>
                    </button>
                  </RouterLink>
                </div>
                <div class="col-12 p-0 order-3">
                  <span>{{ park.address.line1 }}</span>
                  <br>
                  <p>{{ park.address.city }}, {{ park.address.stateCode }} {{ park.address.postalCode }}</p>
                  <p>{{ park.description }}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="container-fluid bg-primary text-light">
      <section class="row">
        <div class="col-12">
          <div class="text-center">
            <button @click="activeContainer = 'parkAlerts'" class="btn">Alerts</button> |
            <button @click="activeContainer = 'articles'" class="btn">Articles</button> |
            <button @click="activeContainer = 'gallery'" class="btn">Gallery</button> |
            <button @click="activeContainer = 'parkInformation'" class="btn">Park Information</button> |
            <button @click="activeContainer = 'reviews'" class="btn">Reviews</button> |
            <button @click="activeContainer = 'thingsToDo'" class="btn">Things To Do</button>
          </div>
        </div>
      </section>
    </div>
    <br>

    <!-- //SECTION - REVIEWS -->
    <div v-if="activeContainer == null || activeContainer == 'reviews'">
      <div v-if="reviews">
        <div class="container">
          <Modalwrapper id="review-form">
            <ReviewForm />
          </Modalwrapper>
          <section class="row d-flex justify-content-between ">
            <div class="text-center text-md-start col-12 col-md-6 ">
              <h3>Park Reviews</h3>
            </div>
            <div class="col-12 col-md-6 text-center text-md-end">
              <button v-if="account" title="Create review" data-bs-toggle="modal" data-bs-target="#review-form"
                class="btn btn-green mdi mdi-plus mb-2"></button>
            </div>
          </section>
          <section class="row justify-content-center">
            <div v-for="review in reviews" :key="review.id" class="col-12 col-md-4 col-lg-3 p-2">
              <ReviewCard :review="review" />
            </div>
          </section>
        </div>
      </div>
    </div>

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
    <div v-if="activeContainer == 'parkInformation'">
      <div v-if="fees">
        <div class="container">
          <Modalwrapper id="fee-card">
            <FeeCard v-if="activeFee" :activeFee />
          </Modalwrapper>
          <section class="row justify-content-center">
            <div class="col-12">
              <h3>Park Information</h3>
              <p v-if="operatingHours[0].description">{{ operatingHours[0].description }}</p>
              <br>
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
          <section class="row mb-3">
            <div class="col-12 col-md-6 col-lg-9">
              <br>
              <h5>Park Operating Hours</h5>
              <div class="container-fluid">
                <section class="row">
                  <div v-for="hours in operatingHours" :key="hours.id" class="col-12 col-md-6 col-lg-3">
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
            <div class="col-12 col-md-6 col-lg-3">
              <br>
              <h5>Park Contact Information</h5>
              <div v-for="phoneNumber in phoneNumbers" :key="phoneNumber.phoneNumber">
                <p>Phone Number: {{ phoneNumber.phoneNumber }}</p>
              </div>
              <div v-for="email in emails" :key="email.emailAddress">
                <p>Email: {{ email.emailAddress }}</p>
              </div>
            </div>
            <div class="col-12">
              <br>
              <h5>Park Location</h5>
              <div v-if="markersLoaded">
                <HereMap :center="center" />
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
            <div class="col-12">
              <div class="d-flex gap-3 align-items-center my-3">
                <button @click="changeArticlePage(currentPage - 1)" class="btn btn-outline-dark">Previous</button>
                <span class="fs-f"> Page {{ AppState.displayCurrentPage }} of {{ totalPages }}</span>
                <button @click="changeArticlePage(currentPage + 1)" class="btn btn-outline-dark">Next</button>
              </div>
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

.bg-card {
  background-color: rgba(0, 0, 0, 0.542);
  color: white;
  border: none;
  text-shadow: rgb(0, 0, 0) 1px 0 2px;
}

.follow-btn {
  text-shadow: rgb(0, 0, 0) 1px 0 2px;
  color: white;
}

.btn-green {
  background-color: #2C4A1E;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
  column-gap: 1rem;
  width: 100%;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .masonry-layout {
    column-count: 2;
  }

  .bg-hero {
    height: 80vh;
  }
}

@media (max-width: 480px) {
  .masonry-layout {
    column-count: 1;
  }

  .bg-hero {
    height: 70vh;
  }

  .follow-btn {
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>



<style>
#fee-card .modal-body {
  padding: 8px;
}

#fee-card .modal-content {
  background-color: #2C4A1E;
}
</style>