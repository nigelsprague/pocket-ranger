<script setup>
import { Fee } from '@/models/Park.js';


defineProps({ activeFee: { type: Fee, required: true } })

</script>


<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{ activeFee.title }}</h4>
      <h1>${{ activeFee.cost }}</h1>
      <div class="text-start">
        <p class="card-text">{{ activeFee.description }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-body{
  color: black;
  text-align: center;
  background-color: #FDFBF1;
  border-radius: 3px;
}
</style>