export default defineNuxtRouteMiddleware((to, from) => {
    // composables
    const auth = useState('auth')

    //get the offline/mode
    const offline = !!localStorage.getItem("offline") //turns anything truthy into true and all else into false
  
    // fetch the offline trees (if any) and count them

    let offlineTrees = localStorage.getItem("offlinetrees")
    let offlineTreesCount = 0
    if(offlineTrees){
      offlineTrees = JSON.parse(offlineTrees)
      offlineTreesCount = offlineTrees.length
    }


    // see if we have an apikey stashed in local storage
    const v = localStorage.getItem('apikey')
    if (v) {
      if (!auth.value) {
        auth.value = {}
      }
      auth.value.authenticated = true
      auth.value.apiKey = v
      auth.value.offline = offline
      auth.value.offlineTreesCount = offlineTreesCount  
      return
    }
  })

