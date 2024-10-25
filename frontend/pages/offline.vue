<script setup>
  // composables
  const auth = useAuth()
  auth.value.offline = true
  localStorage.setItem("offline", "true")
  await navigateTo('/add')
</script>