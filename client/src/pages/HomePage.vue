<script setup>
import { AppState } from '@/AppState.js';
import ParkCard from '@/components/globals/ParkCard.vue';
import { parksService } from '@/services/ParksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const parks = computed(() => AppState.parks)

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
  <div class="container">
    <section class="row">
      <div class="col-12">
        <h1>All Parks</h1>
      </div>
    </section>
    <section class="row">
      <div v-for="park in parks" :key="park.parkCode" class="col-12 col-md-4">
        <ParkCard :park="park" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
