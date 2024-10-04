<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)
const parks = computed(() => AppState.parks)
</script>

<template>
  <div class="about">
    <div v-if="account">
      <div class="text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="d-flex bg-primary px-3 p-2 align-items-center justify-content-between">
        <h3 class="text-start text-offwhite">My Basecamp</h3>
        <div>
          <button class="btn mdi mdi-map fs-2 text-offwhite p-0 px-1" title="My Parks"></button>
          <button class="btn mdi mdi-bookmark-outline fs-2 text-offwhite p-0 px-1" title="Bookmarked Articles"></button>
          <button class="btn mdi mdi-camera-outline fs-2 text-offwhite p-0 px-1" title="My Gallery"></button>
          <button class="btn mdi mdi-heart-outline fs-2 text-offwhite p-0 px-1" title="Liked Posts"></button>
          <button class="btn mdi mdi-alert-outline fs-2 text-offwhite p-0 px-1" title="My Park Alerts"></button>
        </div>
      </div>
      <div class="container">
        <section class="row align-items-baseline text-forest fs-5">
          <div class="col-md-5 fw-bold">
            <span>Favorited Parks</span>
            <div v-for="park in parks" :key="park.parkCode" class="col-12">
              <ParkCard :park="park" />
            </div>
          </div>
          <div class="col-md-5 fw-bold">
            <span>Visited Parks</span>
          </div>
          <div class="col-md-2">
            <span class="text-end">Notifications</span>
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
