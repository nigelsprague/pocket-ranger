<script setup>
import { Park } from '@/models/Park.js';

defineProps({ park: {type: Park, required: true}})

</script>


<template>
<div class="card">
  <img src="..." alt="..." class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">{{ park.fullName }}</h5>
    <!-- <p class="card-text">{{ park.description }}</p> -->
  </div>
</div>
</template>


<style lang="scss" scoped>

</style>