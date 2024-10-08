<template>
  <VApp :theme="setTheme()">
    <router-view />
  </VApp>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const theme = useTheme();
//temporary codes. This will change if there's already multiple theme
const myThemes = ["darkTheme", "lightTheme"];
const getTheme = themeStore.isDarkTheme ? 0 : 1
const selectedTheme = ref(myThemes[getTheme]);

const setTheme = () => {
  theme.global.name.value = selectedTheme.value;
};
</script>
