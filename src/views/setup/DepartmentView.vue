<template>
  <VContainer>
    <BreadCrumbsComponent />

    <VCard class="pa-2" elevation="8">
      <VDataTable :headers="tableHeaders" :items="departments" density="compact">
        <template v-slot:column.name.header="{ props }">
          <!-- Customize the header title for 'name' column -->
          <span class="text-h1">{{ props.column.title }}</span>
        </template>
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
            <v-btn
              class="mr-2 mb-2 text-caption"
              variant="tonal"
              color="success"
              dark
              v-bind="props"
              prepend-icon="mdi-export"
              density="compact"
            >
              Export
            </v-btn>
            <VDialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mb-2 text-caption"
                  variant="tonal"
                  color="secondary"
                  dark
                  v-bind="props"
                  prepend-icon="mdi-plus"
                  density="compact"
                >
                  Create
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </VDialog>

            <VDialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
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

<script setup>
import { onMounted, computed, nextTick, ref, watch } from "vue";

import BreadCrumbsComponent from "@/components/BreadCrumbsComponent.vue";

import { useDepartmentStore } from "@/stores/setup/department";
import { storeToRefs } from "pinia";

const departmentStore = useDepartmentStore();

const { departments } = storeToRefs(departmentStore); // Keeps reactivity

onMounted(() => {
  departmentStore.getAll(); // Fetch departments when the component loads
});

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
const tableItems = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const defaultItem = ref({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Department" : "Edit Department";
});
function initialize() {
  tableItems.value = [
    {
      name: "IT",
    },
    {
      name: "Accounting",
    },
  ];
}
function editItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}
function deleteItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}
function deleteItemConfirm() {
  desserts.value.splice(editedIndex.value, 1);
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
    Object.assign(desserts.value[editedIndex.value], editedItem.value);
  } else {

    desserts.value.push(editedItem.value);
  }
  close();
}
watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});
initialize();
</script>

<style lang="scss">
.v-data-table th {
  padding: 0 !important;
}
</style>
