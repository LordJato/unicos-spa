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
            <div>
              <div>Schedule & Holidays</div>
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
    title: "Christmas Party",
    start: new Date('2024-12-19'), // Corrected date
    end: new Date('2024-12-19'), // Corrected date
    color: "success",
    allDay: true,
  },
  {
    title: "Christmas",
    start: new Date('2024-12-25'), // Corrected date
    end: new Date('2024-12-25'), // Corrected date
    color: "error",
    allDay: true,
  },
  {
    title: "Rizal Day",
    start: new Date('2024-12-30'), // Corrected date
    end: new Date('2024-12-30'), // Corrected date
    color: "error",
    allDay: true,
  },
  {
    title: "New Year Eve",
    start: new Date('2024-12-31'), // Corrected date
    end: new Date('2024-12-31'), // Corrected date
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