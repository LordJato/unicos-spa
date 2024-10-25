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
          <VImg :src="registerBG" max-height="400" />
        </VCol>
        <VCol cols="12" md="6">
          <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
            <VCol cols="12" md="8">
              <VForm @submit.prevent="register">
                <VImg
                  :src="registerAvatar"
                  max-height="150"
                />
                <h1 class="text-center font-weight-black my-2">RESET PASSWORD</h1>
                 <VTextField
                  v-model="form.name"
                  class="my-4"
                  label="Name"
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
                  v-model="form.password_confirmation"
                  class="mt-4"
                  label="Confirm Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  color="primary"
                  density="compact"
                />
                <v-btn type="submit" block class="mb-8" color="primary" size="large" rounded="">
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
  import { useUserStore } from '@/stores/user'
  import registerBG from '@/assets/img/register-bg.svg'
  import registerAvatar from '@/assets/img/register-avatar.svg'
  
  const userStore = useUserStore()
  
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
      const register = await userStore.registerUser(form)
      console.log('Registration successful!', register);
    } catch (error) {
      console.error('Registration failed:', error);
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