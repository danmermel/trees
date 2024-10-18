export default defineNuxtRouteMiddleware((to, from) => {
    // composables
    const auth = useState('auth')
  
    // see if we have an apikey stashed in local storage
    const v = localStorage.getItem('apikey')
    if (v) {
      if (!auth.value) {
        auth.value = {}
      }
      auth.value.authenticated = true
      auth.value.apiKey = v
      return
    }
  })