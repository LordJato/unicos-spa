<template>
  <VApp>
    <NavBar />
    <AppBar />
    <VMain>
      <router-view />
    </VMain>
  </VApp>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import AppBar from "@/components/AppBar.vue";
</script>

<style>

.v-table > .v-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}

.v-data-table-footer {
  border-top: 1px solid #9E9E9E;
  padding-top: 4px !important;
}

.v-navigation-drawer {
  
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #b1b1b1;
  }

  ::-webkit-scrollbar-thumb {
    background: #213268;
    border-radius: 7px;
  }
}
</style>