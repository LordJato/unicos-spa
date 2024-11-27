<template>
  <div>
    <NavBar />
    <AppBar />
    <VMain>
      <router-view />
    </VMain>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import AppBar from "@/components/AppBar.vue";
</script>


<style>
</style>