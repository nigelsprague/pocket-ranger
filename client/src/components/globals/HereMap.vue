<!-- eslint-disable no-undef -->
<script setup>
import { AppState } from '@/AppState.js';
import { computed, onMounted, ref, watch } from 'vue';


const props = defineProps({
  center: { type: Object, required: true },
  zoom: { type: Number }
})

const markers = computed(() => AppState.mapMarkers);

let platform = null;
const apikey = "KvvHdUFGZY2O9XDAprwpX4vQCzvRds9lzfhwkff-Ux0";
const mapContainer = ref()
/**@type {H.Map} */
let map = null
let ui = null;
let currentMarkers = []

onMounted(() => {
  initializeHereMap()
})

watch(markers, () => {

  if (currentMarkers.length && map) {
    map.removeObjects(currentMarkers)
    currentMarkers = []
  }

  // console.log('did the markers change', markers)
  addMarkersToMap();
})

function initializeHereMap() {
  // @ts-ignore
  platform = new window.H.service.Platform({ apikey: apikey })

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  let zoom;
  if (!props.zoom) {
    zoom = 12;
  } else {
    zoom = props.zoom;
  }
  // Instantiate (and display) a map object:
  // @ts-ignore
  map = new H.Map(mapContainer.value, maptypes.vector.normal.map, {
    zoom: zoom,
    // @ts-ignore
    center: props.center
    // center object { lat: 40.730610, lng: -73.935242 }
  });

  addEventListener("resize", () => map.getViewPort().resize());

  // add behavior control
  // @ts-ignore
  new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // add UI
  // @ts-ignore
  ui = H.ui.UI.createDefault(map, maptypes);
  // End rendering the initial map


  addMarkersToMap()
}

function addMarkersToMap() {
  if (!map) { return }

  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    bubble.addClass('test');
    ui.addBubble(bubble);

  }, false);

  for (let i = 0; i < markers.value.length; i++) {
    let marker = markers.value[i];
    // @ts-ignore
    let newMarker = new H.map.Marker({ lat: marker.lat, lng: marker.lng });
    newMarker.setData(`<h5>Zion National Park</h5> <p>Visit zion national park right now stupid</p>`)
    group.addObject(newMarker);
    currentMarkers.push(newMarker)
  }

  // TODO center and zoom the map

}
</script>

<template>
  <div id="map" class="m-0 w-100">
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

.H_ib_content {
  min-width: 500px !important;
}

.test {
  background-color: blue;
}
</style>