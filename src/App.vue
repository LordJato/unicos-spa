<template>
  <VApp >
    <router-view />
  </VApp>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(async () => {
  if (userStore.isLoggedIn) {
    try {
      await userStore.profile();
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
});
</script>
