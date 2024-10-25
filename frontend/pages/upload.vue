<script setup>
const auth = useAuth();
const alert = useAlert();

const disabled = ref(0);
disabled.value = false;
const treeCount = ref(1);
treeCount.value = 0;

const submit = async function () {
    disabled.value = true
  //load tree data
  let offlineTrees = localStorage.getItem("offlinetrees");
  offlineTrees = JSON.parse(offlineTrees);

  for (const tree of offlineTrees) {
    console.log("writing to cloud");
    tree.apiKey = auth.value.apiKey
    const r = await useFetch(
      `https://whuoepm55me6lmx6dyonsdim3i0xiowx.lambda-url.eu-west-1.on.aws/`,
      {
        query: tree,
        method: "get",
      }
    );
    console.log(r.data.value);
    treeCount.value++;
  }
  // now remove the offline trees from local storage
  localStorage.removeItem("offlinetrees");
  // create alert
  alert.value.ts = new Date().getTime();
  alert.value.message = "Saved Offline trees to the Cloud";
  await navigateTo("/");
};
</script>

<template>
  <p>You have {{ auth.offlineTreesCount }} trees in local storage. Do you want to
  save to the cloud now?</p>

  <v-btn :disabled="disabled" @click="submit">Submit</v-btn>

  <v-progress-linear v-if="disabled"
    :model-value="treeCount"
    :max="auth.offlineTreesCount"
  ></v-progress-linear>
</template>