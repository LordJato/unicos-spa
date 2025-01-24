// breadcrumbs.vue
<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const breadcrumbs = ref([])

    const generateBreadcrumbs = () => {
      const path = route.path
      const parts = path.split('/')

      breadcrumbs.value = parts.reduce((acc, part, index) => {
        if (part !== '') {
          const to = `/${parts.slice(0, index + 1).join('/')}`
          acc.push({
            text: part.charAt(0).toUpperCase() + part.slice(1),
            to: to === route.path ? undefined : to,
            disabled: to === route.path
          })
        }
        return acc
      }, [])
    }

    generateBreadcrumbs()

    return {
      breadcrumbs
    }
  }
}
</script>