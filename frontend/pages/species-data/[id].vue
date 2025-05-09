<script setup>
// composables
const route = useRoute();
const runtimeConfig = useRuntimeConfig()

const id = route.params.id;
const species = ref(null);

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
    <NuxtLink :to="`/species-data/${id}-edit`">Edit Species</NuxtLink>
  </div>
  <h3 v-if="species == null">No species data currently available</h3>
</template>
