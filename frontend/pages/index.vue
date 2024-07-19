<script setup>
  const router = useRouter()
  const sponsor = ref(0)
  sponsor.value = ''

  const viewSponsor = async () => {
    console.log('View sponsor!!')
    console.log(sponsor.value)
    router.push({ path: `/sponsor-${sponsor.value}` })
  }

</script>
<template>
 <h1>Trees</h1>
 <h2>Enter sponsor</h2>
 <v-text-field label="Sponsor" v-model="sponsor"></v-text-field>
 <v-btn @click="viewSponsor">View Sponsor's Trees</v-btn>
</template>
