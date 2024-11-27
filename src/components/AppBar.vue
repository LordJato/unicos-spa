<template>
    <VAppBar height="73">
      <VAppBarTitle>
        <VImg
          :src="require('@/assets/logo.png')"
          max-height="150"
          max-width="150"
        />
      </VAppBarTitle>
      <v-spacer></v-spacer>
  
      <VTextField
        :loading="loading"
        density="compact"
        variant="outlined"
        placeholder="Search"
        hide-details
        single-line
        @click:append-inner="onClick"
      >
        <template v-slot:append-inner>
          <VBtn height="38" class="mr-n2"><VIcon>mdi-magnify</VIcon></VBtn>
        </template></VTextField
      >
      <template v-slot:append>
        <VBtn icon="mdi-cogs"></VBtn>
      </template>
    </VAppBar>
  </template>
  
  <script setup>
  </script>
  
  <style>
  </style>