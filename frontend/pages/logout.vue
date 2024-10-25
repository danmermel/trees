<script setup>
  // composables
  const auth = useAuth()
  auth.value.authenticated = false
  localStorage.removeItem("apikey")
  await navigateTo('/')
</script>