<script setup>
import { Review } from '@/models/Review.js';

defineProps({ review: { type: Review, required: true } })

</script>

<template>
  <div class="card bg-white text-black">
    <i class="mdi mdi-delete text-danger fs-4" title="Delete"></i>
    <div class="card-body text-center">
      <div class=" card-title col-12">
        <img :src="review.creator.picture" :alt="review.creator.name">
        <p>{{ review.creator.name }}</p>
      </div>
      <div class=" card-text col-12">
        <h5>{{ review.title }}</h5>
        <p class="m-0">{{ review.body }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

i {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>