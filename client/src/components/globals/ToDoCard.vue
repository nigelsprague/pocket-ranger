<script setup>
import { ThingsToDo } from '@/models/ThingsToDo.js';

defineProps({ toDo: {type: ThingsToDo, required: true}})

</script>


<template>
  <div class="container">
    <section class="row">
      <div class="card p-3 my-1">
        <div class="d-flex">
          <div class="col-2">
            <img class="img-fluid" :src="toDo.images[0].url" :alt="toDo.images[0].altText">
          </div>
          <div class="col-10">
            <div class="px-3">
              <h5>{{ toDo.title }}</h5>
              <p class="m-0">{{ toDo.shortDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
img{
  height: 150px;
  width: 150px;
  object-fit: cover;
  object-position: center;
  align-items: center;
}
.card{
  background-color: #FDFBF1;
  border-color: #2C4A1E;
  border-width: 4px;
}
</style>