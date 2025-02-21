<template>
  <VContainer>
    <VCard class="pa-2" elevation="8">
      <VDataTable
        :headers="tableHeaders"
        :items="departments"
        density="compact"
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
              class="mr-2 mb-2 text-caption"
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
                  class="mb-2 text-caption"
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
              <VCard>
                <VCardTitle>
                  <span class="text-h5">{{ formTitle }}</span>
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
                  <VBtn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </VBtn>
                  <VBtn
                    color="secondary"
                    class="text-caption"
                    variant="flat"
                    @click="save"
                  >
                    Save
                  </VBtn>
                </VCardActions>
              </VCard>
            </VDialog>
            <VDialog v-model="dialogDelete" max-width="500px">
              <VCard>
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
<script setup lang="ts">
import { onMounted, computed, nextTick, ref, watch } from "vue";
import type { Department } from "@/types/department";
import departmentService from "@/services/setup/departmentService";

const departments = ref<Department[]>([]);

onMounted(async () => {
  try {
    departments.value = await departmentService.fetchDepartments();
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
});

const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);
const tableHeaders = ref([
  {
    title: "Name",
    align: "start",
    sortable: true,
    key: "name",
  },
  { title: "Actions", key: "actions", sortable: false },
]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
});
const defaultItem = ref({
  name: "",
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Department" : "Edit Department";
});
function editItem(item) {
  editedIndex.value = departments.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}
function deleteItem(item) {
  editedIndex.value = departments.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}
function deleteItemConfirm() {
  departments.value.splice(editedIndex.value, 1);
  closeDelete();
}
function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}
function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}
function save() {
  if (editedIndex.value > -1) {
    Object.assign(departments.value[editedIndex.value], editedItem.value);
  } else {
    // departmentStore.createDepartment(editedItem.value);
  }
  close();
}
watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});
</script>
<style lang="scss">
.v-data-table th {
  padding: 0 !important;
}
</style>
