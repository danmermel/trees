<script setup>
//first see if there is an API key for adding
const auth = useAuth();
const runtimeConfig = useRuntimeConfig()

if (!auth.value.authenticated) {
  console.log("not authenticated");
  await navigateTo("/settings");
}

const generateid = function () {
  //this is a simple randomness generator.. assuming that the probability of generatign the same id twice is tiny
  const chars = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";
  let treeid = "";
  for (var i = 0; i < 6; i++) {
    let nextchar = Math.floor(Math.random() * chars.length);
    treeid = treeid + chars[nextchar];
  }
  return treeid;
};

// composables
const alert = useAlert();

//variables
const treeid = ref(generateid());
const species = ref('');
const latitude = ref(0);
const longitude = ref(0);
const sponsor = ref('');
const locationName = ref('');
const locationDescription = ref('');
const processing = ref(false);
const datePlanted = ref(new Date());
const isPicking = ref(false);
const fetchinglatlong = ref(false);
const specieslist = ref([]);
const sponsorslist = ref([]);
const offline = ref(false)

//check if we have cached values for sponsors and species

let response = localStorage.getItem("specieslist");
if (response) {
  //we have cached values
  console.log("cached species exist");
  specieslist.value = JSON.parse(response);
}

response = localStorage.getItem("sponsorslist");
if (response) {
  //we have cached values
  console.log("cached sponsors exist");
  sponsorslist.value = JSON.parse(response);
}

// now try to load the lists again, but ONLY if you are not offline

if (!auth.value.offline) {
  setTimeout(async function () {
    // we set a tiny timeout so that the page renders while these API calls are being made
    try {
      //  fetch the species list from the API
      //console.log('API', '/get', `${apiHome}/api/get`)
      const r = await useFetch(runtimeConfig.public.getSpeciesListFunctionUrl.value,
        {
          method: "get",
        }
      );
      specieslist.value = r.data.value.species;
      //write the list to local storage
      localStorage.setItem("specieslist", JSON.stringify(specieslist.value));
    } catch (e) {
      console.error("failed to fetch species", e);
    }

    try {
      //  fetch the sponsors list from the API
      //console.log('API', '/get', `${apiHome}/api/get`)
      const r = await useFetch(runtimeConfig.public.getSponsorsListFunctionUrl.value,
        {
          method: "get",
          query: {
            apiKey: auth.value.apiKey,
          },
        }
      );
      sponsorslist.value = r.data.value.sponsors;
      //write the list to local storage
      localStorage.setItem("sponsorslist", JSON.stringify(sponsorslist.value));
    } catch (e) {
      console.error("failed to fetch sponsors", e);
    }
  }, 1);
} else {
  console.log("In offline mode. Not fetching cloud data");
}

function getLocation() {
  if (navigator && navigator.geolocation) {
    //console.log("fetching location");
    fetchinglatlong.value = true;
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  //   console.log(
  //     "Latitude: " +
  //       position.coords.latitude +
  //       "Longitude: " +
  //       position.coords.longitude
  //   );
  setTimeout(function () {
    fetchinglatlong.value = false;
  }, 500);
}

function showpicker() {
  isPicking.value = true;
}

function formatDate(d) {
  let retval = "";
  let year = d.getFullYear();
  let month = (d.getMonth() + 1).toString().padStart(2, "0"); //add leading zeroes if needed
  let day = d.getDate().toString().padStart(2, "0");
  retval = year + "-" + month + "-" + day;
  console.log("retval is ", retval);
  return retval;
}
const add = async function () {
  try {
    //  add tree
    processing.value = true;
    console.log("date planted is", datePlanted.value);
    const formatteddate = formatDate(datePlanted.value);
    const treeData = {
      species: species.value,
      sponsor: sponsor.value,
      latitude: latitude.value,
      longitude: longitude.value,
      locationDescription: locationDescription.value,
      locationName: locationName.value,
      treeId: treeid.value,
      datePlanted: formatteddate,
    };
    if (!auth.value.offline) {
      console.log("writing to cloud");
      treeData.apiKey = auth.value.apiKey;
      const r = await useFetch(runtimeConfig.public.addTreeFunctionUrl.value,
        {
          query: treeData,
          method: "get",
        }
      );
      console.log(r.data.value);
    } else {
      // you are offline so store in local storage

      let offlineTrees = localStorage.getItem("offlinetrees");
      if (!offlineTrees) {
        //no existing data
        offlineTrees = [];
      } else {
        //some data exists, but it is a string, so parse it
        offlineTrees = JSON.parse(offlineTrees);
      }

      // now add the new tree's data
      console.log("writing locally");
      offlineTrees.push(treeData);
      // now make into a string again and write to local storage
      offlineTrees = JSON.stringify(offlineTrees);
      localStorage.setItem("offlinetrees", offlineTrees);
      auth.value.offlineTreesCount++; //increment counter
    }
    // create alert
    alert.value.ts = new Date().getTime();
    alert.value.message = "Added new Tree";
    treeid.value = generateid(); // generate a new id
  } catch (e) {
    console.error("failed to add tree", e);
  }
  processing.value = false;
};

setInterval(getLocation, 10000);
getLocation();
</script>

<style scoped>
.active {
  background-color: yellow;
}
</style>

<template>
  <OnlineOffline v-model="offline" />
  <h2>Add tree <v-icon color="yellow" v-if="!offline">mdi-lightning-bolt</v-icon></h2>
  <v-text-field v-model="treeid" label="Tree ID"></v-text-field>
  <v-select v-model="species" label="Species" :items="specieslist"></v-select>
  <v-text-field
    v-model="latitude"
    label="Latitude"
    readonly
    :class="{ active: fetchinglatlong }"
  ></v-text-field>
  <v-text-field
    v-model="longitude"
    label="Longitude"
    readonly
    :class="{ active: fetchinglatlong }"
  ></v-text-field>
  <v-row>
    <v-col>
      <v-text-field
        v-model="datePlanted"
        label="Date Planted"
        readonly
      ></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="showpicker">Change</v-btn>
    </v-col>
  </v-row>
  <v-date-picker
    v-model="datePlanted"
    v-if="isPicking"
    elevation="24"
    @update:modelValue="isPicking = false"
  ></v-date-picker>
  <v-select
    v-model="sponsor"
    label="Sponsor"
    :items="sponsorslist"
    item-title="sponsorName"
    item-value="id"
  ></v-select>
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
      datePlanted === '' ||
      processing
    "
    type="button"
    @click="add()"
    >Submit</v-btn
  >
</template>
