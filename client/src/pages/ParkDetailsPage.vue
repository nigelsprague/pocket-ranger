<script setup>
import { Park } from '@/models/Park.js';
import { parksService } from '@/services/ParksService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

onMounted(() => {
  getParkByCode()
})

async function getParkByCode(){
  try {
    const parkCode = route.params.parkCode
    logger.log('Id of the park from the URL', parkCode)
    await parksService.getParkByCode(parkCode)
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


<style lang="scss" scoped></style>