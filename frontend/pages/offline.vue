<script setup>
  // composables
  const auth = useAuth()
  auth.value.offline = true
  await navigateTo('/add')
</script>