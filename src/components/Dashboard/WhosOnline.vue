<template>
    <div>
        <VCard elevation="6">
            <VCardTitle>Who's Online?</VCardTitle>
            <VCardText>
                <VDataTable v-model="selected" :items="items" item-value="name" :headers="headers" dense>
                    <template v-slot:item.image="{ item }">
                        <VAvatar size="30" density="compact" class="pa-0">
                            <VImg :src="item.image" :alt="item.name" />
                        </VAvatar>
                    </template>
                    <template v-slot:item.online="{ item }">
                        <VChip :color="getColor(item.online)">
                            {{ item.online ? 'Online' : 'Offline' }}
                        </VChip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <VIcon class="me-2" size="small" @click="editItem(item)" color="secondary">
                            mdi-pencil
                        </VIcon>
                        <VIcon size="small" @click="deleteItem(item)" color="error">
                            mdi-delete
                        </VIcon>
                    </template>
                    <template v-slot:no-data>
                        <VBtn color="primary" @click="initialize">
                            Reset
                        </VBtn>
                    </template>
                </VDataTable>
            </VCardText>
        </VCard>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref([])
const headers = [
  { title: '', align: 'center', sortable: false, key: 'image', width: '1%', },
  { title: 'Name', align: 'start', sortable: false, key: 'name' },
  { title: 'Position', align: 'start', key: 'position' },
  { title: 'Department', align: 'start', key: 'department' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Status', align: 'start', key: 'online' },
  { title: 'Actions', align: 'start', key: 'actions' },
]

const items = [
  {
    image: 'https://www.profilebakery.com/wp-content/uploads/2023/04/PROFILE-PICTURE-FOR-FACEBOOK.jpg',
    name: 'Juan Miguel Reyes Santos',
    position: 'CTO',
    department: 'Information Technology (IT)',
    email: 'cto@unicos.com',
    online: true,
  },
  {
    image: 'https://www.profilebakery.com/wp-content/uploads/2023/04/women-AI-Profile-Picture.jpg',
    name: 'Maria Sofia Rodriguez',
    position: 'HR Head',
    department: 'Human Resources (HR)',
    email: 'hrhead@unicos.com',
    online: false,
  },
  {
    image: 'https://www.profilebakery.com/wp-content/uploads/2023/04/Profile-Image-AI.jpg',
    name: 'Luis Francisco Gonzales',
    position: 'CBDO',
    department: 'Business Development',
    email: 'cbdo@unicos.com',
    online: true,
  },
  {
    image: 'https://www.profilebakery.com/wp-content/uploads/2023/04/LINKEDIN-Profile-Picture-AI.jpg',
    name: 'Gabriel Jose Velasco',
    position: 'CMO',
    department: 'Marketing',
    email: 'cmo@unicos.com',
    online: true,
  }
]

function getColor(status) {
  return status ? 'success' : 'grey'
}
</script>

<style lang="scss" scoped>

</style>
