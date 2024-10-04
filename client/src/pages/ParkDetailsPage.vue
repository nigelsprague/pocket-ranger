<script setup>
import { AppState } from '@/AppState.js';
import AlertCard from '@/components/globals/AlertCard.vue';
import FeeCard from '@/components/globals/FeeCard.vue';
import ToDoCard from '@/components/globals/ToDoCard.vue';
import Modalwrapper from '@/components/Modalwrapper.vue';
import { alertsService } from '@/services/AlertsService.js';
import { parksService } from '@/services/ParksService.js';
import { toDoService } from '@/services/ToDoService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const park = computed(() => AppState.activePark)
const thingsToDo = computed(() => AppState.thingsToDo)
const alerts = computed(() => AppState.alerts)
const fees = computed(() => AppState.activePark.entranceFees)
const activeFee = ref(null)

onMounted(() => {
  getParkByCode()
  getToDoByCode()
  getAlertByCode()
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
              <button class="btn favorite-btn">
                <i class="mdi mdi-star-outline fs-4"></i>
                <p class="m-0">Favorite</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="fees">
      <div class="container">
        <Modalwrapper id="fee-card">
          <FeeCard v-if="activeFee" :activeFee />
        </Modalwrapper>
        <section class="row">
          <div class="col-12">
            <h3>Entry Information</h3>
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

.favorite-btn {
  background-color: rgba(0, 0, 0, 0.334);
  color: white;
}
</style>