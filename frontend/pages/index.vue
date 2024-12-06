<script setup>
const router = useRouter();
const sponsor = ref(0);
sponsor.value = "";

const { $pwa } = useNuxtApp();

const viewSponsor = async () => {
  if (sponsor.value.length > 0) {
    router.push({ path: `/sponsor-${sponsor.value}` });
  }
};
</script>
<template>
  <v-alert color="warning" v-show="$pwa.needRefresh">
    <h2> New content available, click on reload button to update. </h2>

    <v-btn @click="$pwa.updateServiceWorker()">Reload</v-btn>
  </v-alert>
  <h2>Enter sponsor name</h2>
  <v-text-field label="Sponsor" v-model="sponsor"></v-text-field>
  <v-btn @click="viewSponsor">View Sponsor's Trees</v-btn>
</template>
