<script setup>
// composables

const species = ref(0);
species.value = []


  try {
    //  fetch the species list from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(
      `https://g3dmido2bf3zjb2rqrceql5lty0gqsww.lambda-url.eu-west-1.on.aws/`,
      {
        method: "get"
      }
    );
    species.value = r.data.value.species;
  } catch (e) {
    console.error("failed to fetch species", e);
  }

</script>
<template>
  <h2>Species List</h2>
  <v-list>
    <v-list-item v-for="s in species" :to="s">
      {{ s }}
    </v-list-item>
  </v-list>
  <NuxtLink to="addspecies">Add new Species</NuxtLink>
</template>
