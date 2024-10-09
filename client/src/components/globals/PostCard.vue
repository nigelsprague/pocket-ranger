<script setup>
import { Post } from '@/models/Post';

defineProps({ post: { type: Post, required: true } })
</script>


<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-start">
        <div>
          <img class="img-fluid profile me-3 mb-1" :src="post.creator.picture" :alt="post.creator.name"
            :title="post.creator.name">
          <h6>{{ post.creator.name }}</h6>
        </div>
        <div>
          <div>
            <span class="post-date">{{ post.postDate }}</span>
            <h4 class="mb-1">{{ post.title }}</h4>
          </div>
          <span class="fs-5">{{ post.body }}</span>
          <img v-if="post.image" :src="post.image" alt="Image for post">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile {
  height: 70px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

.card {
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-width: 4px;
}

.post-date {
  color: #646464;
}
</style>