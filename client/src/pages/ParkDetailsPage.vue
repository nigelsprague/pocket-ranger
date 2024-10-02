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

async function getParkByCode(){
  try {
    await parksService.getParkByCode(route.params.parkCode)
  }
  catch (error){
    Pop.error(error)
    logger.log(error)
  }
}

</script>


<template>
<div v-if="park" class="container-fluid">
  <section class="row">
    <div class="col-12">
      <h1>{{ park.fullName }}</h1>
    </div>
    <!-- <div class="col-12"> -->
      <div class="d-flex justify-content-center p-0">
        <img class="img-fluid" :src="park.images[0].url" alt="">
      <!-- </div> -->
    </div>


  </section>
</div>
</template>


<style lang="scss" scoped></style>