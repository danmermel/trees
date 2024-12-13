<script setup>
// composables
const route = useRoute();
const runtimeConfig = useRuntimeConfig()
const id = route.params.id;
const sponsor = route.params.sponsor;
const tree = ref(0);

if (id && sponsor) {
  try {
    //  fetch the tree from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(runtimeConfig.public.getTreeFunctionUrl.value,
      {
        query: {
          treeId: id,
          sponsor: sponsor,
        },
        method: "get",
      }
    );
    tree.value = r.data.value.tree;
  } catch (e) {
    console.error("failed to fetch tree", e);
  }
}
</script>
<template>
  <h2>Tree Record</h2>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Field
        </th>
        <th class="text-left">
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sponsor</td>
        <td><NuxtLink :to="route.path.replace(/\/[^\/]+$/,'')">{{ sponsor }}</NuxtLink></td>
      </tr>
      <tr>
        <td>TreeId</td>
        <td>{{ id }}</td>
      </tr>
      <tr>
        <td>Species</td>
        <td>{{ tree.species }} <NuxtLink :to="`/species/${tree.species}`">(See other trees of this species)</NuxtLink> <NuxtLink :to="`/species-data/${tree.species}`">(See information for this species)</NuxtLink></td>
      </tr>
      <tr>
        <td>Date Planted</td>
        <td>{{ tree.datePlanted }}</td>
      </tr>
      <tr>
        <td>Location (lat/long)</td>
        <td><NuxtLink :to="`/geo/${tree.geohash}`">{{ tree.latitude }} / {{ tree.longitude }}</NuxtLink></td>
      </tr>
      <tr>
        <td>Map</td>
        <td><a :href="`https://www.google.com/maps/search/?api=1&query=${tree.latitude},${tree.longitude}`" target="_new">View Map</a></td>
      </tr>
      <tr>
        <td>Location Name</td>
        <td>{{ tree.locationName }}</td>
      </tr>
      <tr>
        <td>Location Description</td>
        <td>{{ tree.locationDescription }}</td>
      </tr>

    </tbody>
  </v-table>
  <NuxtLink :to="route.path+'-logs'">View Logs</NuxtLink>
</template>
