<template>
  <section id="loginSection">
    <VContainer class="pa-0 h-100 fill-height">
    <!-- <VBtn
      position="fixed"
      color="primary"
      prepend-icon="$vuetify"
      location="top right"
      class="ma-5"
      router-link
      to="/register"
      >Register</VBtn
    > -->
    <VRow class="h-100" justify="center" align="center">
      <VCol cols="12" md="6">
        <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
          <VCol cols="12" md="6">
            <!-- <h1>Unified HR, Boundless Possibilities</h1> -->
            <VForm id="loginForm" ref="loginForm" @submit.prevent="login">
                <VImg :src="loginAvatar" max-height="150" class="mt-2" />
                <h1 class="text-center font-weight-black my-2">SIGN IN</h1>
                <VTextField v-model="form.email" class="my-4" label="Email" type="email" prepend-inner-icon="mdi-email"
                  variant="outlined" color="primary" density="compact" :rules="emailRules" />

                <VTextField v-model="form.password" class="mt-4" label="Password" type="password"
                  prepend-inner-icon="mdi-lock" variant="outlined" color="primary" density="compact"
                  :rules="passwordRules" />
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end mb-4">
                  <a class="text-caption text-decoration-none text-primary" href="#" rel="noopener noreferrer"
                    target="_blank">
                    Forgot password?</a>
                </div>
                <VBtn block class="mb-8" color="primary" size="large" rounded type="submit" form="loginForm">
                  LogIn
                </VBtn>

                <!-- <div
                class="d-flex justify-space-between align-center mx-10 mb-16"
              >
                <v-btn icon="mdi-google" color="red"> </v-btn>
                <v-btn icon="mdi-facebook" color="blue"> </v-btn>
                <v-btn icon="mdi-twitter" color="light-blue lighten-3"> </v-btn>
              </div> -->
              </VForm>

          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="6" class="d-flex justify-center align-center">
        <VImg :src="loginBG" max-height="400" style="z-index: 1;" />
      </VCol>
    </VRow>
  </VContainer>
  <img :src="wave" style="position: fixed; top: 0; right: 0; z-index: 0; min-height: 100vh;"/>
  </section>

</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'

import wave from "@/assets/img/auth/wave.svg"
import loginBG from "@/assets/img/auth/login-bg.svg";
import loginAvatar from "@/assets/img/auth/login-avatar.svg"

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
.rounded-bl-xl {
  background-color: #007acc;
  border-bottom-left-radius: 750px !important;
}

.rounded-br-xl {
  background-color: #007acc;
  border-bottom-right-radius: 750px !important;
}
</style>

<style scoped>
#loginSection{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>