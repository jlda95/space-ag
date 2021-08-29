<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center"> - </v-card>
      <v-card>
        <v-card-title class="headline"> MAPA TEST SPACE-AG </v-card-title>
        <v-card-text>
          <client-only>
            <l-map
              :zoom="zoom"
              :center="center"
              style="height: 500px; width: 100%"
            >
              <l-control class="example-custom-control">
                <v-btn @click="saveMarkers" :disabled="markers.length === 0"
                  >Guardar</v-btn
                >
              </l-control>
              <l-tile-layer :url="url" :attribution="attribution" />
              <!--
                this component is dynamic, so go adding properties on need
              -->
              <component
                :lat-lngs="geometry.coordinates"
                :color="geometry.color"
                :is="geometry.type"
                :id="geometry.key"
                @click="setNewMarker"
              >
              </component>
              <template v-for="(marker, index) in markers">
                <span :key="index">
                  <l-marker
                    :lat-lng="[
                      marker.position.latitude,
                      marker.position.longitude,
                    ]"
                  >
                    <l-popup class="map_popup">
                      <v-form>
                        <v-row>
                          <v-col :cols="11">
                            <v-col :cols="10">
                              <v-row>
                                <v-col :cols="6"> Muestras </v-col>
                                <v-col :cols="5">
                                  <v-text-field
                                    v-model="marker.num_samples"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col :cols="11">
                              <v-row>
                                <v-col :cols="6"> Radio </v-col>
                                <v-col :cols="5">
                                  <v-text-field
                                    v-model="marker.radio"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col :cols="1" @click="deleteMarker(marker)">
                              <v-btn>
                                <v-icon center>mdi-delete</v-icon>
                              </v-btn>
                            </v-col>
                          </v-col>
                        </v-row>
                      </v-form> </l-popup
                    >/>
                  </l-marker>
                  <l-circle
                    :lat-lng="[
                      marker.position.latitude,
                      marker.position.longitude,
                    ]"
                    :radius="Number(marker.radio)"
                  />
                </span>
              </template>
            </l-map>
          </client-only>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
/* eslint-disable */
import { features } from '~/static/spaceag_leaflet.json'
export default {
  data() {
    return {
      zoom: 16,
      center: { lat: -75.8028740844695, lng: -14.009769587288886 },
      geometry: {
        coordinates: [],
        type: '',
        color: '#808080',
        key: '',
      },
      markers: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  },
  created() {
    this.geometry.coordinates = features[0].geometry.coordinates[0]
    this.geometry.type = 'l-' + features[0].geometry.type.toLowerCase()
    this.geometry.key = `${features[0].properties.unit.id}_lote${features[0].properties.unit.name}`
    this.geometry.color = 'black'
  },
  methods: {
    saveMarkers() {
      const markers = { markers: this.markers }
      console.log(markers)
    },
    deleteMarker(marker) {
      const index = this.markers.indexOf(marker)
      if (index > -1) {
        this.markers.splice(index, 1)
      }
    },
    isOnRange(x, y) {
      this.geometry.coordinates.forEach((latLng) => {
        if (x > latLng[0] || y > latLng[1]) return false
      })
      return true
    },
    async setNewMarker(e) {
      if (this.isOnRange(e.latlng.lat, e.latlng.lng)) {
        this.markers.push({
          position: {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          },
          radio: 3,
          num_samples: 0,
        })
      }
    },
  },
}
</script>
<style lang="scss">
.map_popup,
.leaflet-popup {
  min-width: 200px !important;
  max-height: 400px !important;
  .leaflet-popup-content {
    width: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
    .v-input__slot {
      padding: 1px;
      border: 1px solid black;
      input {
        margin-left: 3px;
        color: black !important;
      }
    }
  }
}
</style>