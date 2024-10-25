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
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

watch(route, (to) => {
  document.title = "Unicos - " + to.meta.title;
})

document.title = "Unicos - " + route.meta.title;

</script>

<style>
body::-webkit-scrollbar {
  display: auto;
}
</style>