<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="openNav = !openNav"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title><router-link :to="{ name: 'Home' }" class="text-decoration-none text-white">Love Poem
        Generator</router-link></v-app-bar-title>

    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
    </template>
  </v-app-bar>


  <v-navigation-drawer permanent v-if="openNav">
    <!-- <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Sandra Adams"
              subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list> -->

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- <v-list-item isActive prepend-icon="mdi-home-outline" title="Home" :to="{ name: 'Home' }">
        </v-list-item> -->

      <v-list-item prepend-icon="mdi-heart-circle-outline" title="Create" :to="{ name: 'Create' }"
        @click="openNav = !openNav"></v-list-item>

      <v-list-item prepend-icon="mdi-archive" title="Archive" :to="{ name: 'Archive' }"
        @click="openNav = !openNav"></v-list-item>


    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref } from 'vue'


export default {
  setup() {
    const openNav = ref(false)

    //console.log('nav: ', openNav)

    return { openNav }
  }
} 
</script>
