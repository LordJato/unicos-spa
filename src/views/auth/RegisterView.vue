<template>
  <VContainer class="fill-height pa-0" fluid>
    <v-btn
      position="fixed"
      color="primary"
      prepend-icon="$vuetify"
      location="top right"
      class="ma-5"
      router-link
      to="/login"
      >Login</v-btn
    >
    <VRow class="h-100">
      <VCol
        cols="12"
        md="6"
        class="rounded-br-xl d-flex justify-center align-center"
      >
        <VImg :src="require('@/assets/img/register-bg.svg')" max-height="400" />
      </VCol>
      <VCol cols="12" md="6">
        <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
          <VCol cols="12" md="8">
            <VForm>
              <VImg
                :src="require('@/assets/img/register-avatar.svg')"
                max-height="150"
              />
              <h1 class="text-center font-weight-black my-2">SIGN UP</h1>
              <VSelect
                label="Account Type"
                :items="accountTypes"
                variant="outlined"
                density="compact"
                class="my-2"
                item-title="text"
                item-value="value"
                prepend-inner-icon="mdi-account-tie"
              ></VSelect>
               <VTextField
                v-model="form.email"
                class="my-4"
                label="Username"
                type="email"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                color="primary"
                density="compact"
              />
              <VTextField
                v-model="form.email"
                class="my-4"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                color="primary"
                density="compact"
              />

              <VTextField
                v-model="form.password"
                class="mt-4"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                color="primary"
                density="compact"
              />
                 <VTextField
                v-model="form.password"
                class="mt-4"
                label="Confirm Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                color="primary"
                density="compact"
              />
              <v-btn block class="mb-8" color="primary" size="large" rounded="">
                Register
              </v-btn>

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
    </VRow>
  </VContainer>
</template>

<script setup>
import { reactive } from 'vue'
const accountTypes = [
  { value: 1, text: "Digital Worker" },
  { value: 1, text: "Agency" },
  { value: 1, text: "Clients" },
];

const initialForm = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
};

const form = reactive({
  ...initialForm,
});
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