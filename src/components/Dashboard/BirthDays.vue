<template>
  <div>
    <VCard elevation="6">
      <VCardTitle class="d-flex">
        <div>Birthday</div>
        <VSpacer />
        <VSelect
          label="This Month"
          :items="[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]"
          variant="outlined"
          density="compact"
          class="text-subtitle-1"
          style="font-size: 10px !important"
        >
        </VSelect>
      </VCardTitle>

      <VCardText>
        <VList>
          <VListItem class="pa-0" v-for="(item, i) in birthdays">
            <VListItemTitle class="text-body-2">{{ item.name }}</VListItemTitle>
            <VListItemSubtitle class="text-caption">{{
              item.position
            }}</VListItemSubtitle>
            <template v-slot:prepend>
              <VAvatar size="30" density="compact" class="pa-0" rounded="0">
                <VImg :src="item.image" :alt="item.name" />
              </VAvatar>
            </template>
            <template v-slot:append>
              <span class="text-caption">
                {{ formatDate(item.birthdate) }}</span
              >
            </template>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/helpers/format";
import { ref } from "vue";

const birthdays = ref([
  {
    image:
      "https://www.profilebakery.com/wp-content/uploads/2023/04/PROFILE-PICTURE-FOR-FACEBOOK.jpg",
    name: "Juan Miguel Reyes Santos",
    position: "CTO",
    birthdate: new Date("1974-10-22"),
  }
]);
</script>

<style scoped></style>
