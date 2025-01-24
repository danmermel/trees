
<script setup>
  // composables
  //this page shows all the trees for a single species
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const id = route.params.id
  const trees = ref([])

   if (id) {
    try {
      //  fetch the list from the API
      //console.log('API', '/get', `${apiHome}/api/get`)
      const r = await useFetch(runtimeConfig.public.getBySpeciesFunctionUrl.value,
       {
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
