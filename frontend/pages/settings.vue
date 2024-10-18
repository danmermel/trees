<script setup>
  // local page items
  const auth = useAuth()
  const apiKey = ref(0)
  apiKey.value = ''

  // methods
  const saveKey = async () => {
    //console.log('saving', apiKey.value)
    auth.value.authenticated = true
    auth.value.apiKey = apiKey.value
    localStorage.setItem('apikey', apiKey.value)
    await navigateTo('/add')
  }
</script>
<template>
  <v-form>
    <v-text-field v-model="apiKey" label="Api Key" required></v-text-field>
    <v-btn :disabled="!apiKey" color="success" @click="saveKey">Submit</v-btn>
  </v-form>
</template>