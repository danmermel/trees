<script setup>
// composables
const auth = useAuth();
auth.value.offline = false;
localStorage.removeItem("offline");
await navigateTo('/')
</script>