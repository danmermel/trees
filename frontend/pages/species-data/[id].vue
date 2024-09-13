<script setup>
// composables
const route = useRoute();
const id = route.params.id;
const species = ref(0);
species.value = null;

if (id) {
  try {
    //  fetch the list from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(
      `https://fhtycbg3s7nztnoidxzfu6rfim0rudal.lambda-url.eu-west-1.on.aws/`,
      {
        query: {
          species: id,
        },
        method: "get",
      }
    );
    species.value = r.data.value.species;
  } catch (e) {
    console.error("failed to fetch species", e);
  }
}
</script>

<template>
  <h2>Species - {{ id }}</h2>
  <div v-if="species != null">
    <h3>Description</h3>
    <p>{{ species.speciesDescription }}</p>

    <h3>Care Data</h3>
    <p>{{ species.speciesCareData }}</p>
  </div>
  <h3 v-if="species == null">No species data currently available</h3>
</template>
