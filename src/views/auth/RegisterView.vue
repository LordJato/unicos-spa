<template>
  <section id="registerSection">
    <img :src="registerWave" class="d-none d-lg-flex wave" />
    <VContainer class="pa-0 h-100 fill-height">
      <VRow class="h-100" justify="center" align="center">
        <VCol
          cols="12"
          md="6"
          class="d-none d-lg-flex justify-center align-center"
        >
          <VImg :src="registerBG" max-height="400" style="z-index: 1" />
        </VCol>
        <VCol cols="12" md="6">
          <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
            <VCol cols="12" xl="6" lg="8" md="10" sm="6">
              <VForm
                @submit.prevent="register"
                style="position: relative; z-index: 1"
                ref="registerForm"
              >
                <VImg :src="registerAvatar" max-height="150" />
                <VImg :src="unicosLogo" max-height="60" class="my-5" />

                <VSelect
                  label="Account Type"
                  :items="accountTypes"
                  item-title="name"
                  item-value="id"
                  v-model="form.accountTypeId"
                  class="mt-4"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  prepend-inner-icon="mdi-account-tie"
                  :error-messages="errorMessages.accountTypeId"
                  :rules="rules.accountTypeId"
                />

                <VTextField
                  v-model="form.name"
                  class="mt-2"
                  label="Name"
                  type="text"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :error-messages="errorMessages.name"
                  :rules="rules.name"
                />

                <VTextField
                  v-model="form.email"
                  class="mt-2"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :error-messages="errorMessages.email"
                  :rules="rules.email"
                />

                <VTextField
                  v-model="form.password"
                  class="mt-2"
                  label="Password"
                  :type="passwordVisible ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :error-messages="errorMessages.password"
                  :rules="rules.password"
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

                <VTextField
                  v-model="form.password_confirmation"
                  class="mt-2"
                  label="Confirm Password"
                  :type="passwordConfirmationVisible ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :error-messages="errorMessages.password_confirmation"
                  :rules="rules.password_confirmation"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      @click="
                        passwordConfirmationVisible =
                          !passwordConfirmationVisible
                      "
                      class="cursor-pointer"
                    >
                      {{
                        passwordConfirmationVisible ? "mdi-eye-off" : "mdi-eye"
                      }}
                    </v-icon>
                  </template>
                </VTextField>

                <v-btn
                  type="submit"
                  block
                  class="mb-4 mt-2"
                  color="primary"
                  rounded=""
                  :loading="loading"
                >
                  Register
                </v-btn>
                <span class="text-caption">Already have an account? </span>
                <RouterLink
                  class="text-caption text-decoration-none text-primary"
                  :to="{ name: 'Login' }"
                >
                  Login</RouterLink
                >
              </VForm>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useAlertStore } from "@/stores/useAlertStore";
import { useRouter } from "vue-router";
import { validationRules } from "@/utils/validationRules";

import registerBG from "@/assets/img/auth/register-bg.svg";
import registerAvatar from "@/assets/img/auth/register-avatar.svg";
import registerWave from "@/assets/img/auth/register-wave.svg";
import unicosLogo from "@/assets/img/logo.png";
import handleErrors from "@/utils/handleErrors";

const router = useRouter();
const alertStore = useAlertStore();
const userStore = useUserStore();

const registerForm = ref();
const loading = ref(false);
const passwordVisible = ref(false);
const passwordConfirmationVisible = ref(false);

const accountTypes = ref([
  { id: 1, name: "Tenant" },
  { id: 2, name: "Client" },
  { id: 3, name: "Freelance" },
]);

const initialForm = {
  accountTypeId: null,
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const form = reactive({
  ...initialForm,
});

const errorMessages = reactive({
  accountTypeId: null,
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

const rules = {
  accountTypeId: validationRules.accountTypeId,
  name: validationRules.name,
  email: validationRules.email,
  password: validationRules.password,
  password_confirmation: validationRules.passwordConfirmation(form),
};

const register = async () => {
  try {
    const { valid } = await registerForm.value.validate();

    if (valid) {
      loading.value = true;
      const register = await userStore.registerUser(form);
      const response = register.data;

      if (response.success) {
        alertStore
          .showAlert({
            text: response.message,
            type: "success",
          })
          .then(() => {
            router.push({ name: "Login" });
          });
      }
    }
  } catch (error) {
    handleErrors(error, errorMessages);
  } finally {
    loading.value = false;
  }
};
watch(
  () => alertStore.isVisible,
  (newValue) => {
    if (alertStore.type === "success" && !newValue) {
      router.push({ name: "Login" });
    }
  }
);
</script>

<style scoped>
#registerSection {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e9f2fb;
}

.wave {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 95%;
}
</style>
