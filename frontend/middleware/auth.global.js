export default defineNuxtRouteMiddleware((to, from) => {
    // composables
    const auth = useState('auth')

    //get the offline/mode
    const offline = !!localStorage.getItem("offline") //turns anything truthy into true and all else into false
  
    // see if we have an apikey stashed in local storage
    const v = localStorage.getItem('apikey')
    if (v) {
      if (!auth.value) {
        auth.value = {}
      }
      auth.value.authenticated = true
      auth.value.apiKey = v
      auth.value.offline = offline
      return
    }
  })