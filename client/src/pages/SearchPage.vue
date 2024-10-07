<script setup>
import { AppState } from '@/AppState';
import { parksService } from '@/services/ParksService';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import HereMap from '@/components/globals/HereMap.vue';

onUnmounted(() => {
  parksService.clearSearch()
})

onMounted(() => {
  getAllParks()
})

const editableQuery = ref('')
const parks = computed(() => AppState.parks)

async function getAllParks() {
  try {
    await parksService.getAllParks(62)
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
</script>


<template>
  <div class="container">
    <section class="row">
      <form @submit.prevent="searchParks()" class="d-flex">
        <input v-model="editableQuery" class="form-control" type="text" name="query" id="query"
          placeholder="Search for...">
        <button class="btn bg-secondary ms-2"><span class="mdi mdi-magnify fs-3 text-cream"></span></button>
      </form>
      <HereMap />
    </section>
    <section class="row">
      <section class="row g-3 m-0 mb-3">
        <div v-for="park in parks" :key="park.parkCode" class="col-12">
          <ParkCard :park="park" />
        </div>
      </section>
    </section>
  </div>
</template>


<style lang="scss" scoped></style>