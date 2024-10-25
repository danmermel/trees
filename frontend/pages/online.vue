<script setup>
// composables
const auth = useAuth();
auth.value.offline = false;
localStorage.removeItem("offline");
if (auth.value.offlineTreesCount > 0) {
  await navigateTo("/upload");
} else {
  await navigateTo("/");
}
</script>