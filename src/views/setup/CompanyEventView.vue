<script setup lang="ts">
import { onMounted, computed, nextTick, ref, watch } from "vue";
import type { Company } from "@/types/company";
import companyService from "@/services/setup/companyService";

//State
const companies = ref<Company[]>([]);
const loadingTable = ref<boolean>(true);
const tableHeaders = ref([
  {
    title: "Name",
    align: "start" as const,
    sortable: true,
    key: "name",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: "end" as const,
  },
]);

const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  id: "",
  companyId: null,
  name: "",
});
const defaultItem = ref({
  id: "",
  companyId: null,
  name: "",
});

const breadcrumbsItems = [
  {
    title: "Setup",
    disabled: true,
    to: null,
  },
  {
    title: "Companies",
    disabled: false,
    to: { name: "SetupCompany" },
  },
];

// Computed Properties
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Company" : "Edit Company";
});

// Watchers
watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});

// Methods
const initializeCompanies = async () => {
  try {
    companies.value = await companyService.fetchCompanies();
  } catch (error) {
    console.error("Error fetching companies:", error);
  } finally {
    loadingTable.value = false;
  }
};

const editItem = (item) => {
  editedIndex.value = companies.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = companies.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  companies.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem.value };
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem.value };
    editedIndex.value = -1;
  });
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(companies.value[editedIndex.value], editedItem.value);
  } else {
    companyService.createCompany(editedItem.value);
  }
  close();
};

// Lifecycle Hooks
onMounted(async () => {
  initializeCompanies();
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
        :items="companies"
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
            <VDialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <VBtn
                  class="mb-2"
                  variant="tonal"
                  color="secondary"
                  dark
                  v-bind="props"
                  prepend-icon="mdi-plus"
                  density="compact"
                >
                  Create
                </VBtn>
              </template>
              <VCard class="position-relative">
                <VBtn
                  icon="mdi-close"
                  variant="text"
                  size="small"
                  class="position-absolute top-0 right-0"
                  @click="close"
                ></VBtn>
                <VCardTitle>
                  <span class="text-h6">{{ formTitle }}</span>
                </VCardTitle>
                <VCardText>
                  <VContainer>
                    <VForm>
                      <VTextField
                        v-model="editedItem.name"
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
                  <VBtn
                    color="secondary"
                    class="px-2"
                    variant="flat"
                    @click="save"
                  >
                    Save
                  </VBtn>
                </VCardActions>
              </VCard>
            </VDialog>
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
                    @click="closeDelete"
                    >Cancel</VBtn
                  >
                  <VBtn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteItemConfirm"
                    >OK</VBtn
                  >
                  <VSpacer></VSpacer>
                </VCardActions>
              </VCard>
            </VDialog>
          </VToolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <VIcon class="me-2" size="small" @click="editItem(item)">
            mdi-pencil
          </VIcon>
          <VIcon size="small" color="error" @click="deleteItem(item)">
            mdi-delete
          </VIcon>
        </template>
      </VDataTable>
    </VCard>
  </VContainer>
</template>

<style lang="scss">
.v-data-table th {
  padding: 0 !important;
}
</style>
