<template>
  <VNavigationDrawer v-model="drawer" :image="navigationBG" theme="dark"
    permanent>
    <VList class="py-3">
      <VListItem >
        <VImg :src="unicosLogo" max-height="150" max-width="150" class="mx-auto" />
      </VListItem>
    </VList>

    <VDivider />
    <VList v-model:opened="open" nav>
      <template v-for="(list, i) in lists" :key="i">
        <VListItem v-if="list.listGroup.length === 0" :title="list.title" :value="list.title" :prepend-icon="list.icon"
          @click="$router.push({ name: list.link })">
        </VListItem>
        <VListGroup v-else :value="list.title">
          <template v-slot:activator="{ props }">
            <VListItem v-bind="props" :title="list.title" :prepend-icon="list.icon"></VListItem>
          </template>

          <VListItem v-for="(item, itemIndex) in list.listGroup" :key="itemIndex" :title="item[0]"
            :prepend-icon="item[1]" :value="item[0]" @click="$router.push({ name: item[2] })" />
        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<script setup>
import { ref } from "vue";
import unicosLogo from "@/assets/logo-white.png"
import navigationBG from "@/assets/img/navigation-bg.jpg"

const drawer = ref(true);
const open = ref(null);


const lists = [
  {
    title: 'Dashboard',
    listGroup: [],
    link: 'dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    title: 'Recruitment',
    listGroup: [
      ["Job Opportunities", "mdi-list-box", "jobOpportunities"],
      ["Appointment", "mdi-calendar-clock", "appointment"],
    ],
    link: 'recruitment',
    icon: 'mdi-account-search'
  },
  {
    title: 'HRIS',
    listGroup: [
      ["Employees", "mdi-account-group", "employees"],
      ["Shift", "mdi-calendar-month", "shift"],
      ["Attendance", "mdi-note-check", "attendance"],
      ["Leave", "mdi-island", "leave"],
      ["Overtime", "mdi-clock-time-eight", "overtime"],
      ["Undertime", "mdi-clock-time-four-outline", "undertime"],
      ["Holiday", "mdi-newspaper-variant", "holiday"],
      ["Events", "mdi-party-popper", "events"],
    ],
    link: 'hris',
    icon: 'mdi-folder-account'
  },
  {
    title: 'Payroll',
    listGroup: [
      ["Generate", "mdi-compost", "payrollGenerate"],
      ["Group", "mdi-group", "payrollGroup"],
      ["Cycle", "mdi-recycle-variant", "payrollCycle"],
    ],
    icon: 'mdi-notebook'
  },
  {
    title: 'Calendar',
    listGroup: [],
    link: 'calendar',
    icon: 'mdi-calendar'
  },
  {
    title: 'Accounts',
    listGroup: [],
    link: 'accounts',
    icon: 'mdi-account-box-multiple'
  },
  {
    title: 'Setup',
    listGroup: [
      ["SSS", "mdi-alpha-s-box", "sss"],
      ["Philhealth", "mdi-alpha-p-box", "philhealth"],
      ["Pagibig", "mdi-hand-extended", "pagibig"],
    ],
    link: 'setup',
    icon: 'mdi-cog'
  },
]
</script>

<style>
.border {
  margin-left: 8px;
  margin-right: 8px;
  background: #704232;
  border-radius: 20px;
  text-decoration: none;
}

.v-list-item-group .v-list-item--active {
  color: white !important;
}

.theme--light.v-list-item--active .v-list-item__subtitle,
.theme--light.v-list-item .v-list-item__action-text {
  color: white !important;
}
</style>