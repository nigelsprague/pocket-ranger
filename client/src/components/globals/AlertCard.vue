<script setup>
import { AppState } from '@/AppState';
import { Alert } from '@/models/Alert.js';

defineProps({ alert: { type: Alert, required: true } })

const alertTypes = [
  { category: 'Information', icon: 'mdi mdi-information-variant-circle text-info fs-1', text: 'text-info' },
  { category: 'Caution', icon: 'mdi mdi-sign-caution text-warning fs-1', text: 'text-warning' },
  { category: 'Danger', icon: 'mdi mdi-alert text-danger fs-1', text: 'text-danger' },
  { category: 'Park Closure', icon: 'mdi mdi-close-octagon text-danger fs-1', text: 'text-danger' }
]

</script>


<template>
  <div class="container">
    <section class="row">
      <div class="card p-3 my-1">
        <div class="card-body">
          <div class="d-flex">
            <div class="col-1">
              <i v-if="alert.category == alertTypes[0].category" :class="alertTypes[0].icon"></i>
              <i v-else-if="alert.category == alertTypes[1].category" :class="alertTypes[1].icon"></i>
              <i v-else-if="alert.category == alertTypes[2].category" :class="alertTypes[2].icon"></i>
              <i v-else-if="alert.category == alertTypes[3].category" :class="alertTypes[3].icon"></i>
            </div>
            <div class="col-10">
              <h4 class="card-title">{{ alert.title }}</h4>
              <span v-if="alert.category == alertTypes[0].category" :class="alertTypes[0].text">{{ alert.category
                }}</span>
              <span v-else-if="alert.category == alertTypes[1].category" :class="alertTypes[1].text">{{ alert.category
                }}</span>
              <span v-else-if="alert.category == alertTypes[2].category" :class="alertTypes[2].text">{{ alert.category
                }}</span>
              <span v-else-if="alert.category == alertTypes[3].category" :class="alertTypes[3].text">{{ alert.category
                }}</span>
              <p>{{ alert.lastIndexedDate.toLocaleString() }}</p>
              <p class="card-text">{{ alert.body }}</p>
              <a v-if="alert.url" :href="alert.url" class="btn btn-info">More Information</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
img {
  min-height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
}

.card {
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-width: 4px;
}
</style>