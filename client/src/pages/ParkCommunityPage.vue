<script setup>
import { AppState } from '@/AppState';
import { parksService } from '@/services/ParksService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getParkByCode()
})

const park = computed(() => AppState.activePark)
const route = useRoute()
const center = computed(() => {
  const lat = park.value?.latitude
  const lng = park.value?.longitude
  return { lat: lat, lng: lng }
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
</script>


<template>
  <div class="container-fluid p-0">
    <HereMap :center="center" />
  </div>
</template>


<style lang="scss" scoped></style>