<template>
  <VApp theme="lightTheme">
    <VMain>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </VMain>
  </VApp>
</template>

<style>
body::-webkit-scrollbar {
  display: auto;
}
</style>
