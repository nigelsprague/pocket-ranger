<script setup>
import { parksService } from '@/services/ParksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';


onMounted(() => {
  getAllParks()
})

async function getAllParks(){
  try {
    await parksService.getAllParks()
  }
  catch (error){
    Pop.error(error)
    logger.log(error)
  }
}

</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
