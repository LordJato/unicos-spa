<template>
  <section id="forgotPasswordSection">
    <VContainer class="fill-height pa-0" fluid>
      <VRow class="h-100" justify="center" align="center">
        <VCol cols="6">
          <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
            <VCol cols="12" md="8">
              <VImg :src="unicosLogo" max-height="60" class="my-5" />
              <VCard class="py-5 px-9 rounded-xl">
                <VForm @submit.prevent="register" class="text-center">
                  <h1 class="text-center font-weight-black my-2">
                    Forgot Password?
                  </h1>
                  <span class="text-caption">Remember your password? </span>
                  <RouterLink
                    class="text-caption text-decoration-none text-primary"
                    :to="{ name: 'Login' }"
                  >
                    Login here</RouterLink
                  >
                  <VTextField
                    v-model="form.name"
                    class="mt-6 mb-1"
                    label="Email"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    color="primary"
                    density="compact"
                  />
                  <v-btn type="submit" block color="primary" rounded="xl">
                    Reset Password
                  </v-btn>
                </VForm>
              </VCard>
              <p class="text-caption text-center mt-2">
                Contact Us | support@unicos.com
              </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import unicosLogo from "@/assets/img/logo.png";

const userStore = useUserStore();

const initialForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const form = reactive({
  ...initialForm,
});

const register = async () => {
  try {
    const register = await userStore.registerUser(form);
    console.log("Registration successful!", register);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<style scoped>
#forgotPasswordSection {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e9f2fb;
}
</style>
