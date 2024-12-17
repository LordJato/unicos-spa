<template>
  <div id="dashboard">
    <VContainer fluid>
      <VRow>
        <VCol cols="12" md="9">
          <VRow>
            <VCol cols="12" md="4">
              <VCard elevation="2" rounded="lg">
                <VList lines="two" class="px-8 py-2">
                  <VListItem>
                    <VListItemTitle class="font-weight-bold text-h6">
                      7
                    </VListItemTitle>
                    <VListItemSubtitle class="font-weight-bold text-overline mt-2">
                      Overtime Request
                    </VListItemSubtitle>
                    <template v-slot:append>
                      <v-avatar size="60" color="secondary">
                        <v-icon class="shadow" color="white-primary" size="30">mdi-timer-plus</v-icon>
                      </v-avatar>
                    </template>
                  </VListItem>
                </VList>
              </VCard>
            </VCol>
            <VCol cols="12" md="4">
              <VCard elevation="2" rounded="lg">
                <VList lines="two" class="px-8 py-2">
                  <VListItem>
                    <VListItemTitle class="font-weight-bold text-h6">
                      7
                    </VListItemTitle>
                    <VListItemSubtitle class="font-weight-black text-overline mt-2">
                      Undertime Request
                    </VListItemSubtitle>
                    <template v-slot:append>
                      <v-avatar size="60" color="success">
                        <v-icon class="shadow" color="white-primary" size="30">mdi-timer-minus</v-icon>
                      </v-avatar>
                    </template>
                  </VListItem>
                </VList>
              </VCard>
            </VCol>
            <VCol cols="12" md="4">
              <VCard elevation="2" rounded="lg">
                <VList lines="two" class="px-8 py-2">
                  <VListItem>
                    <VListItemTitle class="font-weight-bold text-h6">
                      10
                    </VListItemTitle>
                    <VListItemSubtitle class="font-weight-black text-subtitle-1 text-overline mt-2">
                      Leave Request
                    </VListItemSubtitle>
                    <template v-slot:append>
                      <v-avatar size="60" color="error">
                        <v-icon class="shadow" color="white-primary" size="30">mdi-account-off</v-icon>
                      </v-avatar>
                    </template>
                  </VListItem>
                </VList>
              </VCard>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="8">
              <VCard class="mt-8 mx-auto overflow-visible" elevation="6">
                <VSheet class="v-sheet--offset mx-auto" color="secondary" elevation="12" max-width="calc(100% - 96px)"
                  rounded="lg">
                  <v-sparkline :labels="labels" :model-value="value" color="white" line-width="2"
                    padding="16"></v-sparkline>
                </VSheet>

                <v-card-text class="pt-0">
                  <div class="text-h6 font-weight-light mb-2">
                    Employee Satisfaction
                  </div>
                  <div class="subheading font-weight-light text-grey">
                    Performance Metrics Analysis
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon class="me-2" size="small">
                    mdi-clock
                  </v-icon>
                  <span class="text-caption text-grey font-weight-light">last assestment 26 minutes ago</span>
                </v-card-text>
              </VCard>
            </VCol>
            <VCol cols="12" md="4">

              <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="The #1 Vue UI Library">
                <template v-slot:title>
                  <span class="font-weight-black">Task</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                  voluptatibus!
                  Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
                  voluptatem!
                </v-card-text>
              </v-card>

            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="12">
              <VCard elevation="6">
                <VCardTitle>Who's Online?</VCardTitle>
                <VCardText>
                  <VDataTable v-model="selected" :items="items" item-value="name" :headers="onlineEmployeeHeaders"
                    dense>
                    <template v-slot:item.image="{ item }">
                      <v-avatar size="30" density="compact" class="pa-0">
                        <v-img :src="item.image" :alt="item.name" />
                      </v-avatar>
                    </template>
                    <template v-slot:item.online="{ item }">
                      <v-chip :color="getColor(item.online)">
                        {{ item.online ? 'Online' : 'Offline' }}
                      </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon class="me-2" size="small" @click="editItem(item)" color="secondary">
                        mdi-pencil
                      </v-icon>
                      <v-icon size="small" @click="deleteItem(item)" color="error">
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary" @click="initialize">
                        Reset
                      </v-btn>
                    </template>
                  </VDataTable>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" md="3">
          <VRow>
            <VCol>
              <VSheet class="pa-2 rounded-lg" elevation="10">
                <VCalendar color="success" hide-week-number class="rounded-lg pa-2" :events="events">
                  <template v-slot:header="{ title, prev, next }">
                    <div class="d-flex justify-space-between align-center">
                      <VBtn icon @click="prev">
                        <VIcon>mdi-chevron-left</VIcon>
                      </VBtn>
                      <h1 class="text-overline">
                        {{ title }}
                      </h1>
                      <VBtn icon @click="next">
                        <VIcon>mdi-chevron-right</VIcon>
                      </VBtn>
                    </div>
                  </template>
                </VCalendar>
                <div class="pa-2">
                  <div class="text-subtitle-1 font-weight-bold">Schedule & Holidays</div>
                  <div>
                    <v-list>
                      <v-list-item class="pa-0" v-for="(item, i) in events">
                        <VListItemTitle class="text-body-2">{{ item.title }}</VListItemTitle>
                        <VListItemSubtitle class="text-caption">{{ item.type }}</VListItemSubtitle>
                        <template v-slot:prepend>
                          <v-chip class="ma-2" :color="item.type === 'Event' ? 'success' : 'error'" variant="outlined">
                            <v-icon :icon="item.type === 'Event' ? 'mdi-party-popper' : 'mdi-beach'"></v-icon>
                          </v-chip>
                        </template>
                        <template v-slot:append>
                          <span class="text-caption"> {{ formatDate(item.start) }}</span>
                        </template>
                      </v-list-item>
                    </v-list>
                  </div>
                </div>

              </VSheet>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VCard elevation="6">
                <VCardTitle class="d-flex">
                  <div>Birthday</div>
                  <VSpacer />
                  <VSelect label="This Month"
                    :items="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
                    variant="outlined" density="compact" class="text-subtitle-1" style="font-size: 10px !important;">
                  </VSelect>
                </VCardTitle>

                <v-card-text class="bg-surface-light pt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                  voluptatibus!
                  Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
                  voluptatem!
                </v-card-text>
              </VCard>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
      
    </VContainer>
    <VContainer>
      <CcvDonutChart :data="tasks" :options="taskOption" />
    </VContainer>
  </div>
</template>

<script setup>
import { formatDate } from '@/helpers/format'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { ref } from 'vue'
import { CcvDonutChart } from '@carbon/charts-vue'

const labels = ref([
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
])
const value = ref([
  200,
  675,
  410,
  390,
  310,
  460,
  250,
  240,
  310,
  460,
  900,
  100,
])

const events = ref([
  {
    type: "Event",
    title: "Christmas Party",
    start: new Date('2024-12-19'),
    end: new Date('2024-12-19'),
    color: "success",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "Christmas",
    start: new Date('2024-12-25'),
    end: new Date('2024-12-25'),
    color: "error",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "Rizal Day",
    start: new Date('2024-12-30'),
    end: new Date('2024-12-30'),
    color: "error",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "New Year Eve",
    start: new Date('2024-12-31'),
    end: new Date('2024-12-31'),
    color: "error",
    allDay: true,
  }
]);

<<<<<<< HEAD
const tasks = ref([
  {
    group: '2V2N 9KYPM version 1',
    value: 20000
  },
  {
    group: 'L22I P66EP L22I P66EP L22I P66EP',
    value: 65000
  },
  {
    group: 'JQAI 2M4L1',
    value: 75000
  },
  {
    group: 'J9DZ F37AP',
    value: 1200
  },
  {
    group: 'YEL48 Q6XK YEL48',
    value: 10000
  },
  {
    group: 'Misc',
    value: 25000
  }
])

const taskOption = ref({
  title: 'Donut (centered)',
  resizable: true,
  legend: {
    alignment: 'center'
  },
  donut: {
    center: {
      label: 'Browsers'
    },
    alignment: 'center'
  },
  height: '400px'
})
=======
const onlineEmployeeHeaders = [
  { title: '', align: 'center', sortable: false, key: 'image', width: '1%', },
  { title: 'Name', align: 'start', sortable: false, key: 'name' },
  { title: 'Position', align: 'start', key: 'position' },
  { title: 'Department', align: 'start', key: 'department' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Status', align: 'start', key: 'online' },
  { title: 'Actions', align: 'start', key: 'actions' },
]

const selected = ref([])
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
  },
  {
    image: 'https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture.jpg',
    name: 'Ana Isabella Garcia',
    position: 'Chief Financial Officer',
    department: 'Finance',
    email: 'cfo@unicos.com',
    online: false,
  },
]

function getColor(status) {
  return status ? 'success' : 'grey'
}
>>>>>>> 94618fcdf590e31588420bcdedff539cee5dc209
</script>

<style>
.shadow {
  filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
}

.v-calendar-month__days>.v-calendar-month__day {
  min-height: 70px;
}

.v-calendar-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-sheet--offset {
  top: -24px;
  position: relative;
}
<<<<<<< HEAD
=======

.v-table>.v-table__wrapper>table>tbody>tr>td:first-child,
.v-table>.v-table__wrapper>table>thead>tr>td:first-child,
.v-table>.v-table__wrapper>table>tfoot>tr>td:first-child {
  padding: 0;
}
>>>>>>> 94618fcdf590e31588420bcdedff539cee5dc209
</style>