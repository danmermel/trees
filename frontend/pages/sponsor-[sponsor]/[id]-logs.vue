<script setup>
// composables
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const auth = useAuth();

const id = route.params.id;
const sponsor = route.params.sponsor;
const logs = ref([]);
const description = ref("");
const processing = ref(false);

const loadLogs = async function () {
  try {
    //  fetch the logs from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(
      runtimeConfig.public.getLogsByTreeFunctionUrl.value,
      {
        query: {
          treeId: id,
        },
        method: "get",
      }
    );
    console.log("response", r);
    logs.value = r.data.value.logs;
    logs.value.sort(function (a, b) {
      if (b.logDate < a.logDate) {
        return -1;
      } else if (b.logDate > a.logDate) {
        return 1;
      } else {
        return 0;
      }
    });
    //tree.value = r.data.value.tree;
  } catch (e) {
    console.error("failed to fetch trees", e);
  }
};

//this loads the logs on page load and also every time a new log is added
if (id && sponsor) {
  await loadLogs();
}

const add = async function () {
  processing.value = true;
  console.log("Adding ", description.value);
  try {
    //  Add log
    const r = await useFetch(runtimeConfig.public.addLogFunctionUrl.value, {
      query: {
        apiKey: auth.value.apiKey,
        treeId: id,
        sponsor,
        description: description.value,
      },
      method: "get",
    });
  } catch (e) {
    console.log("Error adding log: ", e);
  }
  // now reload the logs
  await loadLogs();
  description.value = "";
  processing.value = true;
};
</script>
<template>
  <h2>Tree Logs - for tree {{ sponsor }} / {{ id }}</h2>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">Date</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in logs" :key="l.logDate">
        <td>{{ l.logDate }}</td>
        <td>{{ l.logDescription }}</td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="auth.authenticated">
    <h3>Add New Log Entry</h3>
    <v-text-field v-model="description" label="Log Text"></v-text-field>
    <v-btn
      :disabled="description === '' || processing"
      type="button"
      @click="add()"
      >Submit</v-btn
    >
  </div>
  <NuxtLink :to="route.path.replace(/-logs$/, '')">View Tree</NuxtLink>
</template>
