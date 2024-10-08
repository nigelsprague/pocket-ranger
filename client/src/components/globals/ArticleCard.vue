<script setup>
import { Article } from '@/models/Article.js';

defineProps({ article: { type: Article, required: true } })

</script>


<template>
  <div class="container">
    <section class="row">
      <div class="card p-3 my-1">
        <div class="d-flex">
          <div class="col-4">
            <i v-if="!article.listingImage.url">No Article Image</i>
            <img v-else class="img-fluid" :src="article.listingImage.url" :alt="article.listingImage.altText">
          </div>
          <div class="col-8">
            <div class="px-3">
              <div class="containter-fluid">
                <section class="row">
                  <div class="col-md-11">
                    <h5>{{ article.title }}</h5>
                  </div>
                  <div class="col-md-1 text-end">
                    <i class="fs-4 mdi mdi-bookmark-outline bookmark"></i>
                  </div>
                </section>
              </div>
              <div>
                <p class="m-0">{{ article.body }}</p>
              </div>
              <br />
              <a v-if="article.url" :href="article.url" class="btn">Read More</a>
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

.btn {
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-style: solid;
  border-width: 2px;
}

p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

@media (max-width: 480px) {
  .bookmark{
    position: absolute;
    top: 8px;
    right: 10px;
  }
}
</style>