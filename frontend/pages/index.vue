<script setup>
  const router = useRouter()
  const sponsor = ref(0)
  sponsor.value = ''

  const viewSponsor = async () => {
    if (sponsor.value.length > 0) {
      router.push({ path: `/sponsor-${sponsor.value}` })
    }
  }

</script>
<template>
 <h2>Enter sponsor name</h2>
 <v-text-field label="Sponsor" v-model="sponsor"></v-text-field>
 <v-btn @click="viewSponsor">View Sponsor's Trees</v-btn>
</template>
