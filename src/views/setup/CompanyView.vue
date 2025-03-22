<script setup lang="ts">
import { onMounted, computed, nextTick, ref, watch, shallowRef } from "vue";
import type { Company } from "@/types/company";
import companyService from "@/services/companyService";

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

const DEFAULT_RECORD: Partial<Company> = {
  id: 0,
  accountId: 0,
  name: "",
  address: "",
  city: "",
  province: "",
  postal: "",
  country: "",
  email: "",
  phone: "",
  fax: "",
  tin: "",
  sss: "",
  philhealth: "",
  hdmf: "",
};
const isEditing = shallowRef<boolean>(false);
const record = ref<Partial<Company>>({ ...DEFAULT_RECORD });
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
    title: "Companies",
    disabled: false,
    to: { name: "SetupCompany" },
  },
];

// Computed Properties
const formTitle = computed(() => {
  return isEditing.value ? "Edit Company" : "New Company";
});

// Watchers
watch(dialog, (val) => {
  val || close();
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

function add() {
  isEditing.value = false;
  record.value = DEFAULT_RECORD;
  dialog.value = true;
}

function edit(id: number) {
  isEditing.value = true;

  const found = companies.value.find((item) => item.id === id);

  record.value = {
    id: found.id,
    accountId: found.accountId,
    name: found.name,
    address: found.address,
    city: found.city,
    province: found.province,
    postal: found.postal,
    country: found.country,
    email: found.email,
    phone: found.phone,
    fax: found.fax,
    tin: found.tin,
    sss: found.sss,
    philhealth: found.philhealth,
    hdmf: found.hdmf,
  };

  dialog.value = true;
}

function remove (id : number) {
    const index = companies.value.findIndex(item => item.id === id)
    companies.value.splice(index, 1)
  }


  const save = async () => {
  try {
    if (isEditing.value) {
      // Update company via the store or service
      await companyService.updateCompany(record.value.id!, {
        accountId: record.value.accountId!,
        name: record.value.name!,
        address: record.value.address || "",
        city: record.value.city || "",
        province: record.value.province || "",
        postal: record.value.postal || "",
        country: record.value.country || "",
        email: record.value.email || "",
        phone: record.value.phone || "",
        fax: record.value.fax || "",
        tin: record.value.tin || "",
        sss: record.value.sss || "",
        philhealth: record.value.philhealth || "",
        hdmf: record.value.hdmf || "",
      });
    } else {
      // Create a new company using the service
      await companyService.createCompany({
        name: record.value.name!,
        accountId: record.value.accountId,
        address: record.value.address || "",
        city: record.value.city || "",
        province: record.value.province || "",
        postal: record.value.postal || "",
        country: record.value.country || "",
        email: record.value.email || "",
        phone: record.value.phone || "",
        fax: record.value.fax || "",
        tin: record.value.tin || "",
        sss: record.value.sss || "",
        philhealth: record.value.philhealth || "",
        hdmf: record.value.hdmf || "",
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
                  @click="dialog = false;"
                ></VBtn>
                <VCardTitle>
                  <span class="text-h6">{{ formTitle }}</span>
                </VCardTitle>
                <VCardText>
                  <VContainer>
                    <VForm>
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
  </VContainer>
</template>

<style lang="scss">
.v-data-table th {
  padding: 0 !important;
}
</style>
