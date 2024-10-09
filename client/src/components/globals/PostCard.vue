<script setup>
import { Post } from '@/models/Post';

defineProps({ post: { type: Post, required: true } })
</script>


<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex">
        <img class="img-fluid profile" :src="post.creator.picture" alt="">
        <div class="ms-2">
          <h6>{{ post.creator.name }}</h6>
          <h4>{{ post.title }}</h4>
          <span class="fs-5">{{ post.body }}</span>
          <img v-if="post.image" :src="post.image" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  height: 50px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.card {
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-width: 4px;
}
</style>