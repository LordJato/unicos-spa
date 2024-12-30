<template>
  <VAppBar height="73">
    <v-spacer></v-spacer>

    <VTextField :loading="loading" density="compact" variant="outlined" placeholder="Search" hide-details single-line>
      <template v-slot:append-inner>
        <VBtn height="38" class="mr-n2">
          <VIcon>mdi-magnify</VIcon>
        </VBtn>
      </template>
    </VTextField>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-email</v-icon>
    </v-btn>
    <template v-slot:append>
      <v-list density="compact">
        <v-list-item
          prepend-avatar="https://imgix.ranker.com/user_node_img/50082/1001639646/original/being-strong-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=355"
          title="Steto Javellana">
          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
              </template>



              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :value="item">
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </VAppBar>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false)

const items = ref([
  { text: 'Logout', icon: 'mdi-logout' },
]);

</script>

<style></style>