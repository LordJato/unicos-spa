<script setup lang="ts">
import { onMounted, computed, nextTick, ref, watch, shallowRef } from "vue";
import type { Account } from "@/types";
import { useAlertStore } from "@/stores/useAlertStore";
import accountService from "@/services/accountService";

//State
const alertStore = useAlertStore();
const accounts = ref<Account[]>([]);
const accountTypes = ref([]);
const loadingTable = ref<boolean>(true);
const tableHeaders = ref([
  {
    title: "Name",
    key: "name",
    align: "start",
    sortable: true,
  },
  {
    title: "Account Type",
    key: "accountType.name",
    align: "start",
    sortable: true,
  },
  {
    title: "Actions",
    key: "actions",
    align: "end",
    sortable: false,
  },
] as const);

const DEFAULT_RECORD: Partial<Account> = {
  id: 0,
  accountTypeId: null,
  name: "",
};

const isEditing = shallowRef<boolean>(false);
const record = ref<Partial<Account>>({ ...DEFAULT_RECORD });
const dialog = shallowRef<boolean>(false);

const search = ref("");

const dialogDelete = ref(false);

const breadcrumbsItems = [
  {
    title: "Setup",
    disabled: true,
    to: null,
  },
  {
    title: "Accounts",
    disabled: false,
    to: { name: "Accounts" },
  },
];

// Computed Properties
const formTitle = computed(() => {
  return isEditing.value ? "Edit Account" : "New Account";
});

// Watchers
watch(dialog, (val) => {
  val || close();
});

// Methods
const initializeCompanies = async () => {
  try {
    accounts.value = await accountService.fetchAccounts();
  } catch (error) {
    console.error("Error fetching accounts:", error);
  } finally {
    loadingTable.value = false;
  }
};

const initializeAccountTypes = async () => {
  try {
    const fetchedAccountTypes = await accountService.fetchAccountTypes();
    accountTypes.value = fetchedAccountTypes;
  } catch (error) {
    console.error("Error fetching accounts:", error);
  } finally {
    loadingTable.value = false;
  }
};

function add() {
  isEditing.value = false;
  record.value = DEFAULT_RECORD;
  dialog.value = true;
}

function edit(id: number) {
  isEditing.value = true;

  const found = accounts.value.find((item) => item.id === id);

  record.value = {
    id: found.id,
    accountTypeId: found.accountTypeId,
    name: found.name,
  };

  dialog.value = true;
}

function remove(id: number) {
  const index = accounts.value.findIndex((item) => item.id === id);
  accounts.value.splice(index, 1);
}

const save = async () => {
  try {
    if (isEditing.value) {
      const index = accounts.value.findIndex(
        (item) => item.id === record.value.id
      );
      accounts.value[index] = {
        ...accounts.value[index],
        ...record.value,
      };
      // Update company via the store or service
      const updateAccount = await accountService.updateAccount(
        record.value.id!,
        {
          accountTypeId: record.value.accountTypeId!,
          name: record.value.name!,
          isActive: record.value.isActive,
        }
      );
      
      alertStore.showAlert({
        text: updateAccount.message,
        type: "success",
      });
    } else {
      // Create a new company using the service
      const createAccount = await accountService.createAccount({
        name: record.value.name,
        accountTypeId: record.value.accountTypeId,
        isActive: record.value.isActive,
      });

      alertStore.showAlert({
        text: createAccount.message,
        type: "success",
      });
    }
  } catch (error) {
    console.error("Error saving company:", error);
  } finally {
    dialog.value = false; // Close the dialog after saving
  }
};

// Lifecycle Hooks
onMounted(async () => {
  initializeCompanies();
  initializeAccountTypes();
});
</script>

<template>
  <VContainer>
    <v-breadcrumbs :items="breadcrumbsItems">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>

      <template v-slot:item="{ item }">
        <template v-if="item.to">
          <router-link :to="item.to">
            {{ item.title }}
          </router-link>
        </template>
        <template v-else>
          <span>{{ item.title }}</span>
        </template>
      </template>
    </v-breadcrumbs>
    <VCard class="pa-4" elevation="8">
      <VDataTable
        :headers="tableHeaders"
        :items="accounts"
        density="compact"
        loading-text="Loading... Please wait"
        :loading="loadingTable"
      >
        <template v-slot:top>
          <VToolbar color="surface" class="ma-0">
            <VTextField
              v-model="search"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
              max-width="300"
            ></VTextField>
            <VSpacer />
            <VBtn
              class="mr-2 mb-2"
              variant="tonal"
              color="success"
              dark
              prepend-icon="mdi-export"
              density="compact"
            >
              Export
            </VBtn>
            <VBtn
              class="mb-2"
              variant="tonal"
              color="secondary"
              dark
              prepend-icon="mdi-plus"
              density="compact"
              @click="add"
            >
              Create
            </VBtn>

            <VDialog v-model="dialogDelete" max-width="500px">
              <VCard class="position-relative">
                <VBtn
                  icon="mdi-close"
                  variant="text"
                  size="small"
                  class="position-absolute top-0 end-0 mt-2 me-2"
                ></VBtn>

                <VCardTitle class="text-h5">
                  Are you sure you want to delete this item?
                </VCardTitle>
                <VCardActions>
                  <VSpacer></VSpacer>
                  <VBtn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialog = false"
                    >Cancel</VBtn
                  >
                  <VBtn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialog = false"
                    >OK</VBtn
                  >
                  <VSpacer></VSpacer>
                </VCardActions>
              </VCard>
            </VDialog>
          </VToolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <VIcon class="me-2" size="small" @click="edit(item.id)">
            mdi-pencil
          </VIcon>
          <VIcon size="small" color="error" @click="remove(item.id)">
            mdi-delete
          </VIcon>
        </template>
      </VDataTable>
    </VCard>
    <VDialog v-model="dialog" max-width="500px">
      <VCard class="position-relative">
        <VBtn
          icon="mdi-close"
          variant="text"
          size="small"
          class="position-absolute top-0 right-0"
          @click="dialog = false"
        ></VBtn>
        <VCardTitle>
          <span class="text-h6">{{ formTitle }}</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VForm>
              <VSelect
                label="Account Types"
                :items="accountTypes"
                item-title="name"
                item-value="id"
                variant="outlined"
                v-model="record.accountTypeId"
              ></VSelect>
              <VTextField
                v-model="record.name"
                class="mt-4"
                label="Name"
                type="text"
                variant="outlined"
              />
            </VForm>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="secondary" class="px-2" variant="flat" @click="save">
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<style lang="scss">
.v-data-table th {
  padding: 0 !important;
}
</style>
