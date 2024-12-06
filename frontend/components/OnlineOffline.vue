<script setup>
  import { onMounted, onBeforeUnmount } from 'vue'

  // constants
  const EVENT_ONLINE = 'online'
  const EVENT_OFFLINE = 'offline'

  // a flag which shows whether you're offline or not
  const model = defineModel()
  model.value = false

  const setOnline = () => {
    model.value = false
    localStorage.removeItem("offline")
  }
  const setOffline =  () => { 
    model.value = true
    localStorage.setItem("offline", "true")
  }
  
  // when the page is ready
  onMounted(() => {
    // listen for changes in online status
    window.addEventListener(EVENT_ONLINE, setOnline)
    window.addEventListener(EVENT_OFFLINE, setOffline)
  })

  // when the page is going away
  onBeforeUnmount( () => {
    // unlisten for changes in online status
    window.removeEventListener(EVENT_ONLINE, setOnline)
    window.removeEventListener(EVENT_OFFLINE, setOffline)
  })

</script>
<template></template>