<script setup>
import { Weather } from '@/models/Weather';

defineProps({
  weather: {
    type: Weather, required: true
  }
})
</script>


<template>
  <div class="container">
    <img :src="weather.iconUrl" alt="weather icon">
    <span>{{ weather.tempCels.toFixed(2) }}° C</span>
    <span>{{ weather.tempFar.toFixed(2) }}° F</span>
    <span>{{ weather.weather }}</span>
    <span>{{ weather.wind }} mph</span>
  </div>
</template>


<style lang="scss" scoped></style>