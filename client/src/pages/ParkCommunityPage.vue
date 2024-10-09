<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/globals/PostCard.vue';
import { parksService } from '@/services/ParksService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getParkByCode()
  getPostsByCommunity()
})

const posts = computed(() => AppState.posts)
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

async function getPostsByCommunity() {
  try {
    const parkCode = route.params.parkCode
    await postsService.getPostsByCommunity(parkCode)
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>


<template>
  <div class="container-fluid p-0">
    <div class="mb-3 position-relative">
      <HereMap :center="center" />
    </div>
    <div class="position-absolute mx-2 p-2">
      <h1>{{ park?.fullName }}</h1>
      <span class="fs-4">Community Map</span>
    </div>
    <section class="row m-0">
      <div v-for="post in posts" :key="post.id" class="col-md-9 mb-3 order-md-0 order-1">
        <PostCard :post="post" />
      </div>
      <div class="col-md-3 order-md-1 order-0">
        <form class="row">
          <div class="col-md-12 col-6">
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
          </div>
          <div class="col-md-12 col-6">
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

.position-absolute {
  top: 8.5em;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 8px;
}
</style>