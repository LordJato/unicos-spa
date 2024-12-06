<template>
  <section id="loginSection">
    <VRow justify="center" align="center">
        <VCol cols="12" lg="4" md="8">
          <VRow class="h-100 ma-0 pa-0 justify-center justify-md-start align-center">
            <VCol cols="10" xl="6" lg="8" md="10" >
              <VForm id="loginForm" ref="loginForm" @submit.prevent="login" style="position:relative; z-index: 1;">
                <VImg :src="loginAvatar" max-height="150" />
                <VImg :src="unicosLogo" max-height="60" class="my-5" />
                <VTextField v-model="form.email" class="mt-4" label="Email" type="email" prepend-inner-icon="mdi-email"
                  variant="outlined" color="primary" density="compact" :rules="emailRules" />
                <VTextField v-model="form.password" label="Password" type="password" prepend-inner-icon="mdi-lock"
                  variant="outlined" color="primary" density="compact" :rules="passwordRules" />
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end mb-4">
                  <RouterLink class="text-caption text-decoration-none text-primary" to="/forgot-password">
                    Forgot password?</RouterLink>
                </div>
                <VBtn block class="mb-4" color="primary" rounded type="submit" form="loginForm">
                  LogIn
                </VBtn>

                <span class="text-caption ">Don't have an account? </span>
                <RouterLink class="text-caption text-decoration-none text-primary" to="/register">
                  Sign up</RouterLink>
              </VForm>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" lg="5" md="4" class="justify-center align-center d-none d-lg-flex">
          <VImg :src="loginBG" cover />
        </VCol>
      </VRow>
    <img :src="loginWave" class="d-none d-lg-flex wave" />
  </section>

</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'

import loginWave from "@/assets/img/auth/login-wave.svg"
import loginBG from "@/assets/img/auth/login-bg.svg";
import loginAvatar from "@/assets/img/auth/login-avatar.svg"
import unicosLogo from "@/assets/img/logo.png"

const router = useRouter()

const userStore = useUserStore()

const initialForm = {
  email: "superadmin@unicos.com",
  password: "password",
};

const form = reactive({
  ...initialForm,
});

const emailRules = ref([
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  (v) => {
    if (v?.length <= 100) return true;
    return "Email should not be greater than 100 characters";
  },
]);

const passwordRules = ref([(v) => !!v || "Password is required"]);

async function login() {

  try {
    await userStore.loginUser(form).then(() => {
      router.push({ name: 'dashboard' })
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
#loginSection {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e9f2fb;
  z-index: 1;
}

.wave {
  position: fixed;
  top: 0;
  right: 0;
  z-index: -1;
  bottom: 0;
  height: 100vh;
}
</style>