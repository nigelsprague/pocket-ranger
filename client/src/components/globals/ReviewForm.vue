<script setup>
import { reviewsService } from '@/services/ReviewsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const reviewData = ref({
  recommended: 'true',
  title: '',
  body: '',
  parkCode: route.params.parkCode
})

function resetReviewForm() {
  reviewData.value = {
    recommended: 'true',
    title: '',
    body: '',
    parkCode: route.params.parkCode
  }
}

async function createReview() {
  try {
    const createReview = await reviewsService.createReview(reviewData.value)
    resetReviewForm()
    Pop.toast("Review submitted!", 'success', 'top')
    Modal.getOrCreateInstance('#review-form').hide()
  }
  catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>


<template>
  <div class="container">
    <section class="row">
      <div class="col-md-7">
        <form @submit.prevent="createReview()">
          <div class="mb-3">
            <label for="review-title" class="form-label">Title your review</label>
            <input v-model="reviewData.title" type="text" class="form-control" name="review-title" id="review-title"
              placeholder="Title">
          </div>
          <div class="mb-3">
            <label for="review-body" class="form-label">Write your review</label>
            <textarea v-model="reviewData.body" class="form-control" minlength="1" maxlength="500" name="review-body"
              id="review-body" placeholder="Review Details"></textarea>
          </div>
          <div class="text-end">
            <button class="btn fee-btn" type="submit">Post Review</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped></style>