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
                      <v-avatar size="60" color="success">
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
                      <v-avatar size="60" color="warning">
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
        </VCol>
        <VCol cols="12" md="3">
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
                      <v-chip class="ma-2" :color="item.type === 'Event' ? 'success':'error'" variant="outlined">
                        <v-icon :icon="item.type === 'Event' ? 'mdi-party-popper' : 'mdi-beach'"></v-icon>
                      </v-chip>
                    </template>
                    <template v-slot:append>
                      <span class="text-caption"> {{ item.start }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
            </div>

          </VSheet>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { VCalendar } from 'vuetify/labs/VCalendar'
import { ref } from 'vue'

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
</style>