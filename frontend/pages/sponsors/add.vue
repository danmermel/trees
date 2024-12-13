<script setup>
//first see if there is an API key for adding
const auth = useAuth()
const runtimeConfig = useRuntimeConfig()

if (!auth.value.authenticated) {
  await navigateTo("/settings");
}

// composables
const alert = useAlert();

//variables
const sponsorName = ref(0);
sponsorName.value = "";
const sponsorEmail = ref(1);
sponsorEmail.value = "";
const processing = ref(3)
processing.value = false


const add = async function () {
  try {
    //  add sponsor
    processing.value = true;
    const r = await useFetch(runtimeConfig.public.addSponsorFunctionUrl.value,
      {
        query: {
          sponsorName: sponsorName.value,
          sponsorEmail: sponsorEmail.value,
          apiKey: auth.value.apiKey
        },
        method: "get",
      }
    );
    console.log(r.data.value);
    // create alert
    alert.value.ts = new Date().getTime();
    alert.value.message = "Added new Sponsor";
    await navigateTo("/sponsors")
    

  } catch (e) {
    console.error("failed to add sponsor", e);
  }
  processing.value = false;
};
</script>

<template>
  <h2>Add Sponsor</h2>
  <v-text-field v-model="sponsorName" label="Sponsor Name"></v-text-field>
  <v-text-field v-model="sponsorEmail" label="Sponsor Email"></v-text-field>
  <v-btn
    :disabled="
      sponsorEmail === '' ||
      sponsorName === '' ||
      processing
    "
    type="button"
    @click="add()"
    >Submit</v-btn
  >
</template>
