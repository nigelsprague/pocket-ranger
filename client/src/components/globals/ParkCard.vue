<script setup>
import { Park } from '@/models/Park.js';

defineProps({ park: { type: Park, required: true } })

</script>


<template>
  <RouterLink :to="{ name: 'Park Details', params: { parkCode: park.parkCode } }">
    <div class="card">
      <img :src="park.images[0].url" :alt="park.images[0].title" class="card-img-top park-img">
      <div class="card-body">
        <h5 class="card-title">{{ park.fullName }}</h5>
        <!-- <p class="card-text">{{ park.description }}</p> -->
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.park-img {
  height: 15rem;
  object-fit: cover;
  object-position: center;
}
</style>