<template>
    <div>
        Home Page</div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

async function logout() {
try {
  await userStore.logoutUser().then(() => {
    router.push({ name: 'login' })
  })
} catch (error) {
  console.log(error)
}
}
</script>

<style lang="scss" scoped></style>
