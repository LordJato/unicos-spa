<template>
  <VNavigationDrawer
    v-model="drawer"
    :image="navigationBG"
    theme="dark"
    permanent
  >
    <VList class="py-3">
      <VListItem>
        <VImg
          :src="unicosLogo"
          max-height="150"
          max-width="150"
          class="mx-auto"
        />
      </VListItem>
    </VList>

    <VDivider />
    <VList v-model:opened="open" nav>
      <template v-for="(item, i) in menuItems" :key="i">
      
        <VListItem
          v-if="!item.listGroup"
          :title="item.title"
          :prepend-icon="item.icon"
          @click="$router.push({ name: item.link })"
          :class="{ 'v-list-item--active': $route.name === item.link}"
        />

        <!-- Grouped Items -->
        <VListGroup v-else :value="item.title">
          <template v-slot:activator="{ props }">
            <VListItem
              v-bind="props"
              :title="item.title"
              :prepend-icon="item.icon"
            />
          </template>

          <VListItem
            v-for="(subItem, index) in item.listGroup"
            :key="index"
            
            @click="$router.push({ name: subItem.link })"
            :class="{ 'v-list-item--active': $route.name === subItem.link }"
          >
          <VListItemSubtitle class="text-caption"> 
            {{ subItem.title }}
          </VListItemSubtitle>
          </VListItem>

        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<script setup>
import { ref } from "vue";
import unicosLogo from "@/assets/logo-white.png";
import navigationBG from "@/assets/img/navigation-bg.jpg";
import { menuItems } from "@/config/menu";

const drawer = ref(true);
const open = ref(null);
</script>

<style>
.border {
  margin-left: 8px;
  margin-right: 8px;
  background: #704232;
  border-radius: 20px;
  text-decoration: none;
}

.v-list-item-group .v-list-item--active {
  color: white !important;
}

.theme--light.v-list-item--active .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
  color: white !important;
}
</style>
