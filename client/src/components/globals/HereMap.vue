<!-- eslint-disable no-undef -->
<script setup>
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
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
let bubbles = [];
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
  const maptypes = platform.createDefaultLayers();

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

  let group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    const bubbleContent = evt.target.getData()
    let bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: bubbleContent
    });


    bubbles.push(bubble);
    // bubble.addEventListener('blur', function () {
    //   ui.removeBubble(bubble);
    // })
    // show info bubble
    ui.addBubble(bubble);
    const bubbleElm = bubble.getElement()
    const bubbleLink = bubbleElm.querySelector('a')
    bubbleLink.addEventListener('mousedown', (e) => e.preventDefault())
    bubbleElm.focus()
    bubbleElm.addEventListener('blur', () => bubble.close())

    // group.addEventListener('tap', function () {
    //   while (bubbles.length > 0) {
    //     console.log('help')
    //     ui.removeBubble(bubbles[0]);
    //     bubbles.splice(0, 1);
    //   }
    // })

  }, false);

  for (let i = 0; i < markers.value.length; i++) {
    let marker = markers.value[i];
    // @ts-ignore
    let newMarker = new H.map.Marker({ lat: marker.lat, lng: marker.lng });
    newMarker.setData(`<div class="d-flex align-items-center gap-3"><img src="${marker.image}?width=100"><a href="#/park/${marker.elemId}"><h5>${marker.title}</h5></a></div>`)
    group.addObject(newMarker);
    currentMarkers.push(newMarker);
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
  min-width: 320px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>