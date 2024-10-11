<script setup>
import { Weather } from '@/models/Weather';

defineProps({
  weather: {
    type: Weather, required: true
  }
})
</script>


<template>
  <div class="card bg-weather">
    <div class="container">
      <section class="row align-items-center">
        <div class="col">
          <div class="d-flex flex-column text-center align-items-center">
            <img :src="weather.iconUrl" alt="weather icon">
            <h4>{{ weather.weather }}</h4>
          </div>
        </div>
        <div class="col">
          <h6>{{ weather.tempCels.toFixed(2) }}° C</h6>
          <h6>{{ weather.tempFar.toFixed(2) }}° F</h6>
          <h6>{{ weather.wind }} mph Winds</h6>
        </div>
      </section>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bg-weather {
  background-color: var(--bs-weather);
  color: var(--bs-text);
}
</style>