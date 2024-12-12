<script setup>
// composables
const route = useRoute();
const sponsor = route.params.sponsor;
const runtimeConfig = useRuntimeConfig()

const trees = ref(0);

if (sponsor) {
  try {
    //  fetch the list of trees for sponsor from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(runtimeConfig.public.getBySponsorFunctionUrl.value,
      {
        query: {
          sponsor: sponsor
        },
        method: "get",
      }
    );
    console.log('response', r)
    trees.value = r.data.value.trees
    // logs.value.sort(function(a, b){
    //   if ( b.logDate < a.logDate) {
    //     return -1
    //   } else if (b.logDate > a.logDate) {
    //     return 1
    //   } else {
    //     return 0
    //   }
    // }
    //tree.value = r.data.value.tree;
  } catch (e) {
    console.error("failed to fetch trees", e);
  }
}
</script>

<template>
  <h2>Trees for Sponsor ID {{ sponsor }}</h2>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          TreeId
        </th>
        <th class="text-left">
          Species
        </th>
        <th class="text-left">
          Date Planted
        </th>
        <th class="text-left">
          Location
        </th>
        <th class="text-left">
          Lat/Long
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="t in trees" :key="t.treeId">
        <td><NuxtLink :to="route.path + '/' + t.treeId">{{ t.treeId }}</NuxtLink></td>
        <td><NuxtLink :to="`/species/${t.species}`">{{ t.species }}</NuxtLink></td>
        <td>{{ t.datePlanted }}</td>
        <td>{{ t.locationDescription }}, {{ t.locationName }}</td>
        <td><NuxtLink :to="`/geo/${t.geohash}`">{{ t.latitude }}, {{ t.longitude }}</NuxtLink></td>
      </tr>
    </tbody>
  </v-table>
</template>
