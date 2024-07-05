<script setup>
// composables
const route = useRoute();
const id = route.params.id;
const sponsor = route.params.sponsor;
const log = ref(0);

if (id && sponsor) {
  try {
    //  fetch the tree from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(
      "https://ouc4we3e2getpyfnnq24uytr5m0cexds.lambda-url.eu-west-1.on.aws/",
      {
        query: {
          treeId: id
        },
        method: "get",
      }
    );
    console.log('response', r)
    log.value = r.data.value
    //tree.value = r.data.value.tree;
  } catch (e) {
    console.error("failed to fetch trees", e);
  }
}
</script>
<template>
  <h2>Tree Logs</h2>
  {{ log }}
  <!--<v-table>
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
        <td>{{ sponsor }}</td>
      </tr>
      <tr>
        <td>TreeId</td>
        <td>{{ id }}</td>
      </tr>
      <tr>
        <td>Species</td>
        <td>{{ tree.species }}</td>
      </tr>
      <tr>
        <td>Date Planted</td>
        <td>{{ tree.datePlanted }}</td>
      </tr>
      <tr>
        <td>Location (lat/long)</td>
        <td>{{ tree.latitude }} / {{ tree.longitude }}</td>
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
  <NuxtLink :to="id+'/logs'">View Logs</NuxtLink>-->
</template>
