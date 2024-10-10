<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';

const categories = ['wildlife alert', 'photography', 'point of interest', 'information', 'warning', 'miscellaneous']
const postData = ref({
  title: '',
  body: '',
  category: '',
  image: '',
  parkCode: null
})

function resetForm() {
  postData.value = {
    title: '',
    body: '',
    category: '',
    image: '',
    parkCode: null
  }
}

async function createPost() {
  try {
    postData.value.parkCode = AppState.activePark.parkCode
    const createdPost = await postsService.createPost(postData.value)
    resetForm()
    Pop.toast(`${createdPost.title} created!`, 'success', 'top')
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}
</script>


<template>
  <form @submit.prevent="createPost()" class="row m-0">
    <h2 class="text-forest">Create New Post</h2>
    <div class="mb-3">
      <label for="title">Post Title</label>
      <input v-model="postData.title" type="text" class="form-control" name="title" id="title"
        placeholder="Title here..." maxlength="50" required>
    </div>
    <div class="mb-3">
      <label for="title">Image Url</label>
      <input v-model="postData.image" type="url" class="form-control" name="image" id="image"
        placeholder="Image Url here..." maxlength="500" required>
    </div>
    <div class="mb-3">
      <label for="category">Post Category</label>
      <select v-model="postData.category" name="category" id="category" required class="form-control text-center">
        <option disabled selected value="">-- Please select a post category --</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="body" class="form-label">Post Body</label>
      <textarea v-model="postData.body" class="form-control" name="body" id="body" rows="3" maxlength="1000"
        placeholder="Body text here..." required></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn col-2 btn-secondary mb-3 selectable">Post</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
.form-control {
  background-color: var(--bs-offwhite);
}
</style>