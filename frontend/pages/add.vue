<script setup>
//first see if there is an API key for adding
const apiKey = localStorage.getItem("apikey");
if (!apiKey) {
  await navigateTo("/settings");
}

// composables
const alert = useAlert();

//variables
const treeid = ref(0);
treeid.value = "";
const species = ref(1);
species.value = "";
const latitude = ref(2);
latitude.value = 0;
const longitude = ref(3);
longitude.value = 0;
const sponsor = ref(4);
sponsor.value = "";
const locationName = ref(5);
locationName.value = "";
const locationDescription = ref(6);
locationDescription.value = "";
const processing= ref(7)
processing.value = false

function getLocation() {
  if (navigator && navigator.geolocation) {
    console.log("fetching location");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  console.log(
    "Latitude: " +
      position.coords.latitude +
      "Longitude: " +
      position.coords.longitude
  );
}

const add = async function () {
  try {
    //  add tree
    processing.value = true
    const r = await useFetch(
      `https://whuoepm55me6lmx6dyonsdim3i0xiowx.lambda-url.eu-west-1.on.aws/`,
      {
        query: {
          species: species.value,
          sponsor: sponsor.value,
          latitude: latitude.value,
          longitude: longitude.value,
          locationDescription: locationDescription.value,
          locationName: locationName.value,
          treeId: treeid.value,
          datePlanted: new Date().toISOString(),
          apiKey: apiKey,
        },
        method: "get",
      }
    );
    console.log(r.data.value);
    // create alert
    alert.value.ts = new Date().getTime();
    alert.value.message = "Added new Tree";
    treeid.value="" // clear out tree id to prevent multiple submissions with same id
  } catch (e) {
    console.error("failed to add tree", e);
  }
  processing.value = false
};

setInterval(getLocation, 10000);
getLocation();
</script>

<template>
  <h2>Add tree</h2>
  <v-text-field v-model="treeid" label="Tree ID"></v-text-field>
  <v-select
    v-model="species"
    label="Species"
    :items="['oak', 'beech', 'ash']"
  ></v-select>
  <v-text-field v-model="latitude" label="Latitude" readonly></v-text-field>
  <v-text-field v-model="longitude" label="Longitude" readonly></v-text-field>
  <v-text-field v-model="sponsor" label="Sponsor"></v-text-field>
  <v-text-field v-model="locationName" label="Location Name"></v-text-field>
  <v-text-field
    v-model="locationDescription"
    label="Location Description"
  ></v-text-field>
  <v-btn
    :disabled="
      treeid === '' ||
      species === '' ||
      sponsor === '' ||
      locationName === '' ||
      locationDescription === '' ||
      processing
    "
    type="button"
    @click="add()"
    >Submit</v-btn
  >
</template>
