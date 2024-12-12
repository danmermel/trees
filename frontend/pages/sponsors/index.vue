<script setup>

//first see if there is an API key for adding
const auth = useAuth()
const runtimeConfig = useRuntimeConfig()

if (!auth.value.authenticated) {
  await navigateTo("/settings");
}

const sponsors = ref(0);
sponsors.value = []


  try {
    //  fetch the sponsors list from the API
    //console.log('API', '/get', `${apiHome}/api/get`)
    const r = await useFetch(runtimeConfig.public.getSponsorsListFunctionUrl.value,
      {
        method: "get",
        query: {
          apiKey: auth.value.apiKey
        }
      }
    );
    sponsors.value = r.data.value.sponsors;
  } catch (e) {
    console.error("failed to fetch sponsors", e);
  }

</script>
<template>
  <h2>Sponsors List</h2>

<v-table>
  <thead>
      <tr>
        <th>
          ID
        </th>
        <th>
          Name
        </th>
        <th>
          Email
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="s in sponsors"
        :key="s.id"
      >
        <td><NuxtLink :to="'/sponsor-'+s.id">{{ s.id }}</NuxtLink></td>
        <td>{{ s.sponsorName }}</td>
        <td>{{ s.sponsorEmail }}</td>
      </tr>
    </tbody>
</v-table>

  <NuxtLink to="/sponsors/add">Add new Sponsor</NuxtLink>
</template>
