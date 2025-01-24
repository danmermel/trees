<script setup>
const auth = useAuth();
const alert = useAlert();
const runtimeConfig = useRuntimeConfig()

const disabled = ref(false);
const treeCount = ref(0);

const submit = async function () {
  disabled.value = true;
  //load tree data
  let offlineTrees = localStorage.getItem("offlinetrees");
  offlineTrees = JSON.parse(offlineTrees);

  for (const tree of offlineTrees) {
    console.log("writing to cloud");
    tree.apiKey = auth.value.apiKey;
    try {
      const r = await useFetch(runtimeConfig.public.addTreeFunctionUrl.value,
        {
          query: tree,
          method: "get",
        }
      );
      console.log("response is ", r.data.value);
      if (!r.data.value) {
        //null response so  tree not submitted
        tree.submitted = false;
      } else {
        tree.submitted = true;
      }
      treeCount.value++;
    } catch (e) {
      console.log("error adding tree");
      tree.submitted = false;
    }
  }
  // now remove the submitted offline trees from local storage
  offlineTrees = offlineTrees.filter(function (tree) {
    return tree.submitted === false;
  });
  // now offlineTrees is an array that only contains failed submissions. Write them back to local storage
  offlineTrees = JSON.stringify(offlineTrees);
  localStorage.setItem("offlinetrees", offlineTrees);
  disabled.value = false;
  // create alert
  alert.value.ts = new Date().getTime();
  alert.value.message = "Saved Offline trees to the Cloud";
  await navigateTo("/");
};
</script>

<template>
  <p>You have {{ auth.offlineTreesCount }} trees in local storage.</p>
  <p v-if="auth.offlineTreesCount > 0">Do you want to save to the cloud now?</p>

  <v-btn v-if="auth.offlineTreesCount > 0" :disabled="disabled" @click="submit">Submit</v-btn>

  <v-progress-linear
    v-if="disabled"
    :model-value="treeCount"
    :max="auth.offlineTreesCount"
  ></v-progress-linear>
</template>
