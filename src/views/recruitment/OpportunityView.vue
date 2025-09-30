<template>
    <VContainer>
      <VCard class="pa-2" elevation="8">
        <VDataTable :headers="tableHeaders" :items="tableItems" density="compact">
          <template v-slot:column.name.header="{ props }">
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
              <VBtn
                class="mr-2 mb-2 text-caption"
                variant="tonal"
                color="success"
                dark
                v-bind="props"
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
                      <VRow>
                        <VCol cols="12" md="4" sm="6">
                          <VTextField
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></VTextField>
                        </VCol>
                        <VCol cols="12" md="4" sm="6">
                          <VTextField
                            v-model="editedItem.calories"
                            label="Calories"
                          ></VTextField>
                        </VCol>
                        <VCol cols="12" md="4" sm="6">
                          <VTextField
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></VTextField>
                        </VCol>
                        <VCol cols="12" md="4" sm="6">
                          <VTextField
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></VTextField>
                        </VCol>
                        <VCol cols="12" md="4" sm="6">
                          <VTextField
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></VTextField>
                        </VCol>
                      </VRow>
                    </VContainer>
                  </VCardText>
  
                  <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn color="blue-darken-1" variant="text" @click="close">
                      Cancel
                    </VBtn>
                    <VBtn color="blue-darken-1" variant="text" @click="save">
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
                    >Cancel</VBtn>
                    <VBtn
                      color="blue-darken-1"
                      variant="text"
                      @click="deleteItemConfirm"
                    >OK</VBtn>
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

  
  <script setup>
  import { computed, nextTick, ref, watch } from "vue";
  
  const dialog = ref(false);
  const dialogDelete = ref(false);
  const tableHeaders = ref([
    {
      title: "Title",
      align: "start",
      sortable: true,
      key: "title",
    },
    {
      title: "Type",
      sortable: true,
      key: "type",
    },
    {
      title: "Work Setup",
      sortable: false,
      key: "workSetup",
    },
    {
      title: "Vacancy",
      sortable: false,
      key: "vacancy",
    },
    {
      title: "Status",
      sortable: false,
      key: "status",
    },
    { title: "Actions", key: "actions", sortable: false },
  ]);
  
  const tableItems = ref([]);
  const editedIndex = ref(-1);
  
  const defaultItem = ref({
    name: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });
  const formTitle = computed(() => {
    return editedIndex.value === -1 ? "New Opportunity" : "Edit Opportunity";
  });
  function initialize() {
    tableItems.value = [
      {
        'name' : 'IT'
      },
      {
        'name' : 'Accounting'
      }
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
  
