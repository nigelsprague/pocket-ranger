<script setup>
import { AppState } from '@/AppState.js';
import { parksService } from '@/services/ParksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const park = computed(() => AppState.activePark)

onMounted(() => {
  getParkByCode()
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
  <div v-if="park">
    <div :style="{ backgroundImage: 'url(' + park.images[0].url + ')' }" class="container-fluid bg-hero d-flex">
      <section class="row">
        <div class="align-content-center justify-content-between d-flex">
          <div class="col-md-5">
            <div class="card m-5 p-3">
              <h3>{{ park.fullName }}</h3>
              <span>{{ park.address.line1 }}</span>
              <span>{{ park.address.city }}, {{ park.address.stateCode }} {{ park.address.postalCode }}</span>
              <br/>
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
  </div>
</template>


<style lang="scss" scoped>
.bg-hero{
  height: 87vh;
  background-size: cover;
  background-position: center;
}
.card{
  background-color: rgba(0, 0, 0, 0.334);
  color: white;
  border: none;
}
.favorite-btn{
  background-color: rgba(0, 0, 0, 0.334);
  color: white;
}
</style>