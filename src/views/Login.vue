<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">

      <div class="text-body-2 font-weight-light mb-n1">welcome to</div>

      <h1 class="text-h2 font-weight-bold">Login</h1>

      <div class="py-6" />

      <router-link to="/create">
        <v-btn color="primary">create</v-btn>
      </router-link>

    </v-responsive>
  </v-container>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
</script>
