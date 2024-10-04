<script setup>
import { Fee } from '@/models/Fee.js';

defineProps({ activeFee: { type: Fee, required: true } })

</script>


<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">{{ activeFee.title }}</div>
      <h1>${{ activeFee.cost }}</h1>
      <p class="card-text">{{ activeFee.description }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>