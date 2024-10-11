<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

defineProps({ post: { type: Post, required: true } })

const account = computed(() => AppState.account)

async function deletePost(postId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return
    await postsService.deletePost(postId)
    Pop.success('Post deleted')
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
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
        </div>
        <div v-if="account?.id == post.creatorId" class="col text-end dropdown">

          <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="mdi mdi-dots-vertical fs-1"></i>
          </button>
          <ul class="dropdown-menu">
            <li>
              <button @click="deletePost(post.id)" class="dropdown-item text-danger text-center" type="button">Delete
                Post <i class="mdi mdi-delete-forever"></i></button>
            </li>
          </ul>

        </div>
      </div>
      <div>
        <img class="img-fluid post-img" v-if="post.image" :src="post.image" alt="Image for post">
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

.post-img {
  // border: solid #2C4A1E 2px;
  border-radius: 5px;
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