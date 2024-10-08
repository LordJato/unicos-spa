<template>
  <VMain>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </VMain>
</template>

<script setup>
</script>

<style>
body::-webkit-scrollbar {
  display: auto;
}
</style>