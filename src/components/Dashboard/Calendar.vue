<template>
    <div>
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
                                <v-chip class="ma-2" :color="item.type === 'Event' ? 'success' : 'error'"
                                    variant="outlined">
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
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { formatDate } from '@/helpers/format'



const events = ref([
    {
        type: "Holiday",
        title: "New Year's Day",
        start: new Date('2025-01-01'),
        end: new Date('2025-01-01'),
        color: "error",
        allDay: true,
    },
    {
        type: "Event",
        title: "New Year's Resolutions",
        start: new Date('2025-01-12'),
        end: new Date('2025-01-12'),
        color: "success",
        allDay: true,
    },
    {
        type: "Holiday",
        title: "First Philippine Republic Day",
        start: new Date('2025-01-23'),
        end: new Date('2025-01-23'),
        color: "error",
        allDay: true,
    },
    {
        type: "Holiday",
        title: "Lunar New Year's Day",
        start: new Date('2025-01-29'),
        end: new Date('2025-01-29'),
        color: "error",
        allDay: true,
    }
]);

</script>

<style lang="scss" scoped></style>