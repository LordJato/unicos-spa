<template>
  <div>
    <VSheet class="pa-2 rounded-lg" elevation="10">
      <VCalendar
        color="success"
        hide-week-number
        class="rounded-lg pa-2"
        :events="events"
      >
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
          <VList>
            <VListItem class="pa-0" v-for="(item, i) in events">
              <VListItemTitle class="text-body-2">{{
                item.title
              }}</VListItemTitle>
              <VListItemSubtitle class="text-caption">{{
                item.type
              }}</VListItemSubtitle>
              <template v-slot:prepend>
                <VChip
                  class="ma-2"
                  :color="item.type === 'Event' ? 'success' : 'error'"
                  variant="outlined"
                >
                  <VIcon
                    :icon="
                      item.type === 'Event' ? 'mdi-party-popper' : 'mdi-beach'
                    "
                  ></VIcon>
                </VChip>
              </template>
              <template v-slot:append>
                <span class="text-caption"> {{ formatDate(item.start) }}</span>
              </template>
            </VListItem>
          </VList>
        </div>
      </div>
    </VSheet>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { VCalendar } from "vuetify/labs/VCalendar";
import { formatDate } from "@/helpers/format";

const events = ref([
  {
    type: "Holiday",
    title: "Eid'l Fitr (Feast of Ramadhan)",
    start: new Date("2025-04-01"),
    end: new Date("2025-04-01"),
    color: "error",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "The Day of Valor",
    start: new Date("2025-04-09"),
    end: new Date("2025-04-09"),
    color: "error",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "Maundy Thursday",
    start: new Date("2025-04-17"),
    end: new Date("2025-04-17"),
    color: "error",
    allDay: true,
  },
  {
    type: "Holiday",
    title: "Black Saturday",
    start: new Date("2025-04-19"),
    end: new Date("2025-04-19"),
    color: "error",
    allDay: true,
  },
]);
</script>

<style lang="scss" scoped></style>
