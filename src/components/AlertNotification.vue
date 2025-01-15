<template>
    <div>
        <VScrollXReverseTransition>
            <VAlert v-model="alert" :type="type" border="start" elevation="2" :border-color="type"
                :icon="icon" prominent closable :text="text">
            </VAlert>
        </VScrollXReverseTransition>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const alert = ref(false);

const icon = computed(() => {
  return {
    success: 'mdi-check-circle',
    error: 'mdi-alert',
    warning: 'mdi-alert',
    info: 'mdi-info'
  }[type];
});

watch(alert, (newVal) => {
    if (newVal) {
        setTimeout(() => { alert.value = false }, 3000)
    }
});

</script>

<style lang="scss" scoped>
.v-alert {
    position: fixed;
    top: 15%;
    right: 2%;
    margin: 0 auto;
    display: flex;
}
</style>