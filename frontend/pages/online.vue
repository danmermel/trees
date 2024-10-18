<script setup>
  // composables
  const auth = useAuth()
  auth.value.offline = false
  await navigateTo('/')
</script>