
<script setup>
// composables
const auth = useAuth();
//   const route = useRoute()

// local page items
const drawer = ref(false);

const runtimeConfig = useRuntimeConfig()

const version = ref(runtimeConfig.public.version)

</script>
<template>
  <VitePwaManifest />
  <v-app theme="light">
    <v-app-bar density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title @click="navigateTo('/')">Tree Bank</v-app-bar-title>
      <template v-slot:append>
        <v-badge
          color="red"
          :content="auth.offlineTreesCount"
        >
          <v-btn density="compact" icon="mdi-cloud-off-outline" v-if="auth.offline"></v-btn>
          <v-btn density="compact" icon="mdi-cloud-outline" v-if="!auth.offline" @click="navigateTo('/upload')"></v-btn>
        </v-badge>
        <v-btn icon="mdi-plus" @click="navigateTo('/add')"></v-btn>
        <!-- <v-btn v-if="route.name !== 'index'" icon="mdi-chevron-left" @click="navigateTo('/')"></v-btn> -->
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left">
      <v-list>
        <v-list-item
          v-if="!auth.offline"
          prepend-icon="mdi-home"
          title="Home"
          @click="navigateTo('/')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && !auth.offline"
          prepend-icon="mdi-pine-tree"
          title="Add Species"
          @click="navigateTo('/species-data/addspecies')"
        ></v-list-item>
        <v-list-item
          v-if="!auth.offline"
          prepend-icon="mdi-forest"
          title="List Species"
          @click="navigateTo('/species-data')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated"
          prepend-icon="mdi-tree"
          title="Add Tree"
          @click="navigateTo('/add')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && !auth.offline"
          prepend-icon="mdi-account"
          title="Add Sponsor"
          @click="navigateTo('/sponsors/add')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && !auth.offline"
          prepend-icon="mdi-account-multiple"
          title="List Sponsors"
          @click="navigateTo('/sponsors')"
        ></v-list-item>
        <v-list-item
          v-if="!auth.offline"
          prepend-icon="mdi-information"
          title="About"
          @click="navigateTo('/about')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && !auth.offline"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="navigateTo('/logout')"
        ></v-list-item>
        <v-list-item
          v-if="!auth.authenticated"
          prepend-icon="mdi-login"
          title="Login"
          @click="navigateTo('/settings')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && !auth.offline"
          prepend-icon="mdi-cloud-off-outline"
          title="Go Offline"
          @click="navigateTo('/offline')"
        ></v-list-item>
        <v-list-item
          v-if="auth.authenticated && auth.offline"
          prepend-icon="mdi-cloud-outline"
          title="Go Online"
          @click="navigateTo('/online')"
        ></v-list-item>
        <v-list-item>
          Version: {{ version }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Alert></Alert>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
