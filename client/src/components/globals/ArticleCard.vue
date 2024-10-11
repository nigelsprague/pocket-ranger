<script setup>
import { AppState } from '@/AppState.js';
import { Article } from '@/models/Article.js';
import { bookmarksService } from '@/services/BookmarksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({ article: { type: Article, required: true } })
const bookmarks = computed(() => AppState.bookmarks)
const account = computed(() => AppState.account)

const alreadyBookmarked = computed(() => {
  const foundBookmark = bookmarks.value.find(bookmark => bookmark.articleId == props.article.id)
  if (foundBookmark) return true
  else return false
})

async function createBookmark() {
  try {
    const bookmarkData = {
      title: props.article.title,
      url: props.article.title,
      articleId: props.article.id,
      articleImage: props.article.listingImage.url
    }
    await bookmarksService.createBookmark(bookmarkData)
    Pop.success('You bookmarked this article!')
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

async function deleteBookmark() {
  try {
    const foundBookmark = bookmarks.value.find(bookmark => bookmark.articleId == props.article.id)
    await bookmarksService.deleteBookmark(foundBookmark.id)
    Pop.toast("Bookmark removed from article!")
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
                    <i v-if="!alreadyBookmarked" @click="createBookmark()"
                      class="fs-4 mdi mdi-bookmark-outline bookmark"></i>
                    <i v-if="alreadyBookmarked" @click="deleteBookmark()" class="fs-4 mdi mdi-bookmark bookmark"></i>
                  </div>
                </section>
              </div>
              <div>
                <p class="m-0">{{ article.body }}</p>
              </div>
              <br />
              <a v-if="article.url" :href="article.url" target="_blank" class="btn">Read More</a>
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
  color: #FDFBF1;
  background-color: #2C4A1E;
}

p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

@media (max-width: 480px) {
  .bookmark {
    position: absolute;
    top: 8px;
    right: 10px;
  }
}
</style>