<template>
    <div>
        Home Page <RouterLink class="text-caption text-decoration-none text-primary" to="/dashboard" @click.prevent="logout">
            Click to Logout</RouterLink>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
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