
<script setup>
  // composables
  //this page shows all the trees for a single species
  const route = useRoute()
  const id = route.params.id
  const trees = ref(0)

   if (id) {
    try {
      //  fetch the list from the API
      //console.log('API', '/get', `${apiHome}/api/get`)
      const r = await useFetch(`https://jrjtzr6cmifv6eq47o7pqsnp440sipjc.lambda-url.eu-west-1.on.aws/`, {
        query: {
            'species': id
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
    <h2>Species - {{ id }}</h2>
    <v-list>
    <v-list-item v-for="tree in trees" :key="tree.treeId+tree.sponsor" :to="`/sponsor-${tree.sponsor}/${tree.treeId}`">
      <v-list-item-title>{{  tree.sponsor }} / {{ tree.treeId }}</v-list-item-title>
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
