<script setup>
  // composables
  const route = useRoute()
  const id = route.params.id
  const trees = ref(0)

   if (id) {
    try {
      //  fetch the list from the API
      //console.log('API', '/get', `${apiHome}/api/get`)
      const r = await useFetch(`https://ol2aodc7qdhklmhfxa7lhx3tjm0wfwuy.lambda-url.eu-west-1.on.aws/`, {
        query: {
            'geohash': id
        },
        method: 'get'
      })
      trees.value = r.data.value.trees
    } catch (e) {
      console.error('failed to fetch trees', e)
    }
  }

</script>

<template>
    <v-list>
    <v-list-item v-for="tree in trees" :key="tree.treeId+tree.sponsor" :to="`/sponsor-${tree.sponsor}/${tree.treeId}`">
      <v-list-item-title>Sponsor: {{  tree.sponsor }} (Tree Id:{{ tree.treeId }})</v-list-item-title>
      <v-list-item-subtitle>Date Planted: {{ tree.datePlanted }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>
