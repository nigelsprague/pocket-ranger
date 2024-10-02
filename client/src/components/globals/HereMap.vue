<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, ref } from 'vue';


const props = defineProps({
  center: { type: Object }
})

let platform = null;
const apikey = "KvvHdUFGZY2O9XDAprwpX4vQCzvRds9lzfhwkff-Ux0";
const mapContainer = ref('')

onMounted(() => {
  initializeHereMap()
})

function initializeHereMap() {
  platform = new window.H.service.Platform({ apikey: apikey })

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  var map = new H.Map(mapContainer.value, maptypes.vector.normal.map, {
    zoom: 10,
    center: props.center
    // center object { lat: 40.730610, lng: -73.935242 }
  });

  addEventListener("resize", () => map.getViewPort().resize());

  // add behavior control
  new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // add UI
  H.ui.UI.createDefault(map, maptypes);
  // End rendering the initial map
}
</script>


<template>
  <div id="map">
    <div id="mapContainer" style="height:600px;width:100%" ref="mapContainer"></div>
  </div>
</template>


<style lang="scss" scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>