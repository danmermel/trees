<script setup>
//first see if there is an API key for adding
const auth = useAuth()
const runtimeConfig = useRuntimeConfig()

if (!auth.value.authenticated) {
  await navigateTo("/settings");
}

// composables
const alert = useAlert();

//variables
const species = ref(0);
species.value = "";
const speciesDescription = ref(1);
speciesDescription.value = "";
const speciesCareData = ref(2);
speciesCareData.value = "";
const processing = ref(3)
processing.value = false

const formatName = function(str) {
    return str[0].toUpperCase()+str.slice(1)
}

const add = async function () {
  try {
    //  add species
    processing.value = true;
    const r = await useFetch(runtimeConfig.public.addSpeciesFunctionUrl.value,
      {
        query: {
          species: formatName(species.value),
          speciesDescription: speciesDescription.value,
          speciesCareData: speciesCareData.value,
          apiKey: auth.value.apiKey
        },
        method: "get",
      }
    );
    console.log(r.data.value);
    // create alert
    alert.value.ts = new Date().getTime();
    alert.value.message = "Added new Species";
    await navigateTo("/species-data/")
    

  } catch (e) {
    console.error("failed to add species", e);
  }
  processing.value = false;
};
</script>

<template>
  <h2>Add Species</h2>
  <v-text-field v-model="species" label="Species Name"></v-text-field>
  <v-text-field v-model="speciesDescription" label="Description"></v-text-field>
  <v-text-field v-model="speciesCareData" label="Care Data"></v-text-field>
  <v-btn
    :disabled="
      species === '' ||
      speciesDescription === '' ||
      speciesCareData === '' ||
      processing
    "
    type="button"
    @click="add()"
    >Submit</v-btn
  >
</template>
