<script setup>
import { AppState } from '@/AppState.js';
import ParkCard from '@/components/globals/ParkCard.vue';
import { parksService } from '@/services/ParksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const parks = computed(() => AppState.parks)
// const parkCodeList = {}

onMounted(() => {
  getAllParks()
})

async function getAllParks() {
  try {
    await parksService.getAllParks()
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>

<template>
  <div class="hero-img">
    <div class="container h-100">
      <div class="d-flex h-100 align-items-center">
        <div class="hero-txt">
          <h1>Pocket Ranger</h1>
          <h4>A better way to love our parks</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="title-bar text-cream">
    <h5>Explore Parks</h5>
  </div>
  <div class="container-fluid">
    <section class="row g-3 mb-3 p-5">
      <div v-for="park in parks" :key="park.parkCode" class="col-12 col-md-4">
        <ParkCard :park="park" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero-img {
  background-image: url('https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  height: calc(70vh - 64px);
  background-position: center;
  background-size: cover;
}

.hero-txt {
  color: var(--cream);
}

.title-bar {
  background-color: var(--secondary-brown);
  padding: 1em;
}
</style>
