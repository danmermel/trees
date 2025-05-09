<script setup>
// composables
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const auth = useAuth();
const alert = useAlert();

const id = route.params.id;
const species = ref("");
const speciesDescription = ref("");
const processing = ref(false);

//fetch the species data

if (id) {
  try {
    //  fetch the list from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(runtimeConfig.public.getSingleSpeciesFunctionUrl.value,
      {
        query: {
          species: id,
        },
        method: "get",
      }
    );
    species.value = id
    speciesDescription.value = r.data.value.species.speciesDescription;
    //console.log(species.value)
  } catch (e) {
    console.error("failed to fetch species", e);
  }
}

const edit = async function () {
  try {
    //  add species
    processing.value = true;
    const r = await useFetch(runtimeConfig.public.addSpeciesFunctionUrl.value,
      {
        query: {
          species: id,
          speciesDescription: speciesDescription.value,
          apiKey: auth.value.apiKey
        },
        method: "get",
      }
    );
    //console.log(r.data.value);
    // create alert
    alert.value.ts = new Date().getTime();
    alert.value.message = "Edited Species";
    await navigateTo("/species-data/")
    

  } catch (e) {
    console.error("failed to edit species", e);
  }
  processing.value = false;
};
</script>


<template>
  <h2>Edit Species</h2>
  <v-text-field readonly v-model="species" label="Species Name"></v-text-field>
  <v-text-field v-model="speciesDescription" label="Description"></v-text-field>
  <v-btn
    :disabled="species === '' || speciesDescription === '' || processing"
    type="button"
    @click="edit()"
    >Submit</v-btn
  >
</template>
