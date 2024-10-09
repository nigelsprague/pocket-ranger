<script setup>
import { AppState } from '@/AppState';
import { parksService } from '@/services/ParksService';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import HereMap from '@/components/globals/HereMap.vue';

onUnmounted(() => {
  parksService.clearSearch()
  AppState.mapMarkers = [];
})

onMounted(() => {
  searchAllParks()
})

const editableQuery = ref('')
const parks = computed(() => AppState.parks)
const center = computed(() => {
  const lat = '39.8283'
  const lng = '-98.5795'
  return { lat: lat, lng: lng }
})

let markersLoaded = false;

watch(parks, () => {
  loadMarkers();
})

async function searchAllParks() {
  try {
    await parksService.searchAllParks()
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function searchParks() {
  try {
    await parksService.searchParks(editableQuery.value)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

function loadMarkers() {
  const markers = [];
  parks.value.forEach(park => {
    let marker = { lat: park.latitude, lng: park.longitude };
    markers.push(marker);
  })
  AppState.mapMarkers = markers;
  markersLoaded = true;
}
</script>


<template>
  <div class="container">
    <section class="row">
      <form @submit.prevent="searchParks()" class="d-flex mb-3">
        <input v-model="editableQuery" class="form-control" type="text" name="query" id="query"
          placeholder="Search for...">
        <button class="btn bg-secondary ms-2"><span class="mdi mdi-magnify fs-3 text-cream"></span></button>
      </form>
      <div v-if="markersLoaded">
        <HereMap :center="center" :zoom="2.5" />
      </div>
    </section>
    <i v-if="parks">{{ parks.length }} result{{ parks.length > 1 ? 's' : '' }}</i>
    <section class="row g-3 m-0 mb-3">
      <div v-for="park in parks" :key="park.parkCode" class="col-12">
        <ParkCard :park="park" />
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped></style>