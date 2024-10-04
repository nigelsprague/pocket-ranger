<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)
const favoritedParks = computed(() => AppState.favoritedParks)
const visitedParks = computed(() => AppState.visitedParks)
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
          <button class="btn mdi mdi-cog-outline fs-2 text-offwhite p-0 px-1" title="My Park Alerts"></button>
        </div>
      </div>

      <div class="container mt-2">
        <section class="row align-items-baseline justify-content-between text-forest fs-5">
          <div class="col-md-4">
            <h4>Favorited Parks</h4>
            <div v-for="park in favoritedParks" :key="park.parkCode" class="col-12">
              <ParkCard :park="park" />
            </div>
          </div>
          <div class="col-md-4">
            <h4>Visited Parks</h4>
            <div v-for="park in visitedParks" :key="park.parkCode" class="col-12">
              <ParkCard :park="park" />
            </div>
          </div>
          <div class="col-md-3 text-end">
            <h4>Notifications</h4>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="alerts" checked />
              <label class="form-check-label" for="alerts">Alerts</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="community" checked />
              <label class="form-check-label" for="community">Community</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="articles" checked />
              <label class="form-check-label" for="articles">Articles</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="events" checked />
              <label class="form-check-label" for="events">Events</label>
            </div>
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

.form-check-input {
  background-color: var(--offwhite);
}

.form-check-input:checked {
  background-color: var(--bs-secondary);
  border-color: var(--bs-secondary);
}
</style>
