<script setup>
import { Alert } from '@/models/Alert.js';

defineProps({ alert: { type: Alert, required: true } })

</script>


<template>
  <div class="container">
    <section class="row">
      <div class="card p-3 my-1">
        <div class="card-body">
          <div class="d-flex">
            <div class="col-1">
              <i class="mdi mdi-alert-octagon text-danger fs-1"></i>
            </div>
            <div class="col-10">
              <h4 class="card-title">{{ alert.title }}</h4>
              <span class="text-danger">{{ alert.category }}</span>
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


<style lang="scss" scoped></style>