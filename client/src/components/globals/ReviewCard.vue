<script setup>
import { AppState } from '@/AppState.js';
import { Review } from '@/models/Review.js';
import { reviewsService } from '@/services/ReviewsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)
defineProps({ review: { type: Review, required: true } })

async function deleteReview(reviewId) {
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to delete your review?`)
    if (!confirmed) return
    await reviewsService.deleteReview(reviewId)
    Pop.toast("Deleted review!", 'success', 'center')
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>

<template>
  <div class="card bg-white text-black h-100">
    <i v-if="review.creator.id == account?.id" @click="deleteReview(review.id)"
      class="delete mdi mdi-delete text-danger fs-4 btn" title="Delete"></i>
    <div class="card-body text-center">
      <div class=" card-title col-12">
        <img :src="review.creator.picture" :alt="review.creator.name">
        <p class="m-0">{{ review.creator.name }}</p>
        <p v-if="review.recommended == true">
          <i class="yes mdi mdi-check-circle"></i> Recommends park
        </p>
        <p v-if="!review.recommended == true">
          <i class="text-danger mdi mdi-close-circle"></i> Does not recommend park
        </p>
      </div>
      <div class="card-text col-12">
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

.yes {
  color: #2C4A1E;
}

.delete {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>