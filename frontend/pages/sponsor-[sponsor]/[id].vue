<script setup>
// composables
const route = useRoute();
const id = route.params.id;
const sponsor = route.params.sponsor;
const tree = ref(0);

if (id && sponsor) {
  try {
    //  fetch the tree from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(
      `https://yhth4m7iirn5rxxxcy6ihfiwze0xallq.lambda-url.eu-west-1.on.aws/`,
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
    console.error("failed to fetch trees", e);
  }
}
</script>
<template>
  {{ tree }}
</template>