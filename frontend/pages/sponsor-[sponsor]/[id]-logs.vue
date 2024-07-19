<script setup>
// composables
const route = useRoute();
const id = route.params.id;
const sponsor = route.params.sponsor;
const logs = ref(0);

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
    logs.value = r.data.value.logs
    logs.value.sort(function(a, b){
      if ( b.logDate < a.logDate) {
        return -1
      } else if (b.logDate > a.logDate) {
        return 1
      } else {
        return 0
      }
    })
    //tree.value = r.data.value.tree;
  } catch (e) {
    console.error("failed to fetch trees", e);
  }
}
</script>
<template>
  <h2>Tree Logs - for tree {{ sponsor }} / {{ id }}</h2>
  
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in logs" :key="l.logDate">
        <td>{{ l.logDate }}</td>
        <td>{{ l.logDescription }}</td>
      </tr>
    </tbody>
  </v-table>
  <NuxtLink :to="route.path.replace(/-logs$/,'')">View Tree</NuxtLink>
</template>
