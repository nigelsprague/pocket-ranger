<script setup>
import { Park } from '@/models/Park.js';

defineProps({ park: { type: Park, required: true } })

</script>


<template>
  <RouterLink :to="{ name: 'Park Details', params: { parkCode: park.parkCode } }">
    <div class="card h-100 shadow">
      <img :src="park.images[0].url + '?width=500'" :alt="park.images[0].title" class="card-img-top park-img">
      <div class="card-body">
        <h5 class="card-title">{{ park.fullName }}</h5>
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