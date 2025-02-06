<template>
  <VAppBar height="73">
    <VSpacer />

    <VTextField
      :loading="loading"
      density="compact"
      variant="outlined"
      placeholder="Search"
      hide-details
      single-line
    >
      <template v-slot:append-inner>
        <VBtn height="38" class="mr-n2">
          <VIcon>mdi-magnify</VIcon>
        </VBtn>
      </template>
    </VTextField>
    <VSpacer />
    <VBtn icon>
      <VIcon>mdi-bell</VIcon>
    </VBtn>

    <VBtn icon>
      <VIcon>mdi-email</VIcon>
    </VBtn>
    <template v-slot:append>
      <VList density="compact">
        <VListItem
          prepend-avatar="https://imgix.ranker.com/user_node_img/50082/1001639646/original/being-strong-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=355"
          title="Steto Javellana"
        >
          <template v-slot:append>
            <VMenu>
              <template v-slot:activator="{ props }">
                <VBtn
                  icon="mdi-dots-vertical"
                  variant="text"
                  v-bind="props"
                ></VBtn>
              </template>
              <VList>
                <VListItem
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  @click.prevent="handleClick(item)"
                >
                  <template v-slot:prepend>
                    <VIcon :icon="item.icon"></VIcon>
                  </template>
                  <VListItemTitle v-text="item.text"></VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VListItem>
      </VList>
    </template>
  </VAppBar>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);

const items = ref([{ text: "Logout", icon: "mdi-logout" }]);

function handleClick(item) {
  if (item.text === "Logout") {
    logout();
  }
}

async function logout() {
  try {
    await userStore.logoutUser().then((res) => {
      if (res.success) {
        router.push({ name: "Login" });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
