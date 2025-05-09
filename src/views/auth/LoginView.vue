<template>
  <section id="loginSection">
    <VContainer>
      <VRow justify="center" align="center">
        <VCol cols="12" lg="6" md="8">
          <VRow class="h-100 ma-0 pa-0 justify-center align-center">
            <VCol cols="10" xl="6" lg="8" md="10">
              <VForm
                id="loginForm"
                ref="loginForm"
                @submit.prevent="login"
                style="position: relative; z-index: 1"
              >
                <VImg :src="loginAvatar" max-height="150" />
                <VImg :src="unicosLogo" max-height="60" class="my-5" />
                <VTextField
                  v-model="form.email"
                  class="mt-4"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="emailRules"
                  :error-messages="errorMessages.email"
                />
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :type="passwordVisible ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :rules="passwordRules"
                  :error-messages="errorMessages.password"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      @click="passwordVisible = !passwordVisible"
                      class="cursor-pointer"
                    >
                      {{ passwordVisible ? "mdi-eye-off" : "mdi-eye" }}
                    </v-icon>
                  </template>
                </VTextField>
                <div
                  class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end mb-4"
                >
                  <RouterLink
                    class="text-caption text-decoration-none text-primary"
                    :to="{ name: 'ForgotPassword' }"
                  >
                    Forgot password?</RouterLink
                  >
                </div>
                <VBtn
                  block
                  class="mb-4"
                  color="primary"
                  rounded
                  type="submit"
                  form="loginForm"
                  :loading="loading"
                >
                  LogIn
                </VBtn>

                <span class="text-caption">Don't have an account? </span>
                <RouterLink
                  class="text-caption text-decoration-none text-primary"
                  :to="{ name: 'Register' }"
                >
                  Sign up</RouterLink
                >
              </VForm>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          cols="12"
          lg="6"
          md="4"
          class="justify-center align-center d-none d-lg-flex"
        >
          <VImg :src="loginBG" cover />
        </VCol>
      </VRow>
    </VContainer>
    <img :src="loginWave" class="d-none d-lg-flex wave" />
  </section>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { validationRules } from "@/utils/validationRules";

import loginWave from "@/assets/img/auth/login-wave.svg";
import loginBG from "@/assets/img/auth/login-bg.svg";
import loginAvatar from "@/assets/img/auth/login-avatar.svg";
import unicosLogo from "@/assets/img/logo.png";
import handleErrors from "@/utils/handleErrors";

const router = useRouter();

const userStore = useUserStore();

const loading = ref(false);
const passwordVisible = ref(false);

const initialForm = {
  email: "superadmin@unicos.com",
  password: "password",
};

const form = reactive({
  ...initialForm,
});

const errorMessages = reactive({
  email: null,
  password: null,
});

const emailRules = validationRules.email;

const passwordRules = validationRules.password;

async function login() {
  try {
    loading.value = true;
    await userStore.loginUser(form).then(() => {
      router.push({ name: "Dashboard" });
    });
  } catch (error) {
    console.log("error", error);
    handleErrors(error, errorMessages);
  } finally {
    loading.value = false;
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
