<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/globals/PostCard.vue';
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
  <h1>{{ park?.fullName }}</h1>
  <div class="container-fluid p-0">
    <div class="mb-3">
      <HereMap :center="center" />
    </div>
    <section class="row m-0">
      <div class="col-md-10">
        <PostCard />
      </div>
      <div class="col-md-2">
        <form>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="wildlife" id="wildlife" checked>
            <label class="form-label" for="wildlife">Wildlife</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="photography" id="photography" checked>
            <label class="form-label" for="photography">Photography</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="poi" id="poi" checked>
            <label class="form-label" for="poi">Points of Interest</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="info" id="info" checked>
            <label class="form-label" for="info">Information</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="warning" id="warning" checked>
            <label class="form-label" for="warning">Warning</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" name="misc" id="misc" checked>
            <label class="form-label" for="misc">Miscellaneous</label>
          </div>
        </form>
      </div>
    </section>
  </div>

</template>


<style lang="scss" scoped>
.form-check-input {
  background-color: var(--offwhite);
}

.form-check-input:checked {
  background-color: var(--bs-secondary);
  border-color: var(--bs-secondary);
}
</style>