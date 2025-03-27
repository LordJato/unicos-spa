<template>
  <div>
    <VScrollXReverseTransition>
      <VAlert
        v-if="alertStore.isVisible"
        :type="alertStore.type"
        elevation="2"
        :border-color="alertStore.type"
        :icon="icon"
        prominent
        closable
        :text="alertStore.text"
        @click:close="alertStore.hideAlert"
        density="compact"
      >
      </VAlert>
    </VScrollXReverseTransition>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAlertStore } from "@/stores/useAlertStore";

const alertStore = useAlertStore();

const icon = computed(() => {
  return {
    success: "mdi-check-circle",
    error: "mdi-alert",
    warning: "mdi-alert",
    info: "mdi-info",
  }[alertStore.type];
});
</script>

<style lang="scss" scoped>
.v-alert {
  position: fixed;
  top: 5%;
  right: 2%;
  margin: 0 auto;
  display: flex;
  z-index: 99999;
}
</style>

<style>
.v-alert .v-alert__close {
  align-self: center !important;
}
</style>
