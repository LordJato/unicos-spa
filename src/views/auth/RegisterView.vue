<template>
  <section id="registerSection">
    <img :src="registerWave" class="d-none d-lg-flex wave" />
    <VContainer class="pa-0 h-100 fill-height">
      <VRow class="h-100" justify="center" align="center">
        <VCol cols="12" md="6" class="d-none d-lg-flex justify-center align-center">
          <VImg :src="registerBG" max-height="400" style="z-index: 1;" />
        </VCol>
        <VCol cols="12" md="6">
          <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
            <VCol cols="12" xl="6" lg="8" md="10" sm="6">
              <VForm @submit.prevent="register" style="position:relative; z-index: 1;">
                <VImg :src="registerAvatar" max-height="150" />
                <VImg :src="unicosLogo" max-height="60" class="my-5" />

                <VSelect label="Account Type" :items="accountTypes" item-title="name" item-value="id" v-model="form.accountTypeId"
                  class="mt-4" variant="outlined" density="compact" color="primary" prepend-inner-icon="mdi-account-tie" />
                <VTextField v-model="form.name"  label="Name" type="email" prepend-inner-icon="mdi-account"
                  variant="outlined" color="primary" density="compact" />
                <VTextField v-model="form.email" label="Email" type="email" prepend-inner-icon="mdi-email"
                  variant="outlined" color="primary" density="compact" />

                <VTextField v-model="form.password" label="Password" type="password" prepend-inner-icon="mdi-lock"
                  variant="outlined" color="primary" density="compact" />
                <VTextField v-model="form.password_confirmation" label="Confirm Password" type="password"
                  prepend-inner-icon="mdi-lock" variant="outlined" color="primary" density="compact" />
                <v-btn type="submit" block class="mb-4 " color="primary" rounded="">
                  Register
                </v-btn>
                <span class="text-caption ">Already have an account? </span>
                <RouterLink class="text-caption text-decoration-none text-primary" to="/login">
                  Login</RouterLink>
              </VForm>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </section>

</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import registerBG from '@/assets/img/auth/register-bg.svg'
import registerAvatar from '@/assets/img/auth/register-avatar.svg'
import registerWave from '@/assets/img/auth/register-wave.svg'
import unicosLogo from "@/assets/img/logo.png"

const userStore = useUserStore()

const accountTypes = ref([
  {id: 1, name: 'Tenant'},
  {id: 2, name: 'Client'},
  {id: 3, name: 'Freelance'},
])

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