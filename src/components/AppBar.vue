<template>
  <VAppBar height="73">
    <VAppBarTitle>
      <VImg :src="unicosLogo" max-height="150" max-width="150" />
    </VAppBarTitle>
    <v-spacer></v-spacer>

    <VTextField :loading="loading" density="compact" variant="outlined" placeholder="Search" hide-details single-line>
      <template v-slot:append-inner>
        <VBtn height="38" class="mr-n2">
          <VIcon>mdi-magnify</VIcon>
        </VBtn>
      </template>
    </VTextField>
    <template v-slot:append>
      <VBtn icon="mdi-cogs"></VBtn>
    </template>
  </VAppBar>
</template>

<script setup>
import { ref } from 'vue'
import unicosLogo from "@/assets/logo.png"

const loading = ref(false)

</script>

<style></style>