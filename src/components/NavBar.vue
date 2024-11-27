<template>
    <VNavigationDrawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list>
        <v-list-item
          :prepend-avatar="require('@/assets/img/default-profile.jpg')"
          title="Ye Futian"
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="
                rail = !rail;
                open = null;
              "
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
  
      <v-divider></v-divider>
      <v-list v-model:opened="open" nav>
        <!-- DASHBOARD -->
        <v-list-item
          title="Dashboard"
          prepend-icon="mdi-view-dashboard"
          value="Dashboard"
            @click="$router.push({name : 'dashboard'})"
        >
          <v-tooltip v-if="rail" activator="parent" location="bottom"
            >Dashboard</v-tooltip
          ></v-list-item
        >
  
        <!-- RECRUITMENT -->
        <v-list-group value="Recruitment">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Recruitment"
              prepend-icon="mdi-account-search"
            ></v-list-item>
            <v-tooltip v-if="rail" activator="parent" location="bottom"
              >Recruitment</v-tooltip
            >
          </template>
  
          <v-list-item
            v-for="([title, icon], i) in recruitment"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>
        </v-list-group>
  
        <!-- HRIS -->
        <v-list-group value="Hris">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="HRIS"
              prepend-icon="mdi-folder-account"
            ></v-list-item>
            <v-tooltip v-if="rail" activator="parent" location="bottom"
              >HRIS</v-tooltip
            >
          </template>
  
          <v-list-item
            v-for="([title, icon], i) in hris"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>
        </v-list-group>
  
        <!-- PAYROLL -->
        <v-list-group value="Payroll">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Payroll"
              prepend-icon="mdi-notebook"
            ></v-list-item>
            <v-tooltip v-if="rail" activator="parent" location="bottom"
              >Payroll</v-tooltip
            >
          </template>
  
          <v-list-item
            v-for="([title, icon], i) in payroll"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>
        </v-list-group>
  
        <!-- CALENDAR -->
        <v-list-item
          title="Calendar"
          prepend-icon="mdi-calendar"
          value="Calendar"
        >
          <v-tooltip v-if="rail" activator="parent" location="bottom"
            >Calendar</v-tooltip
          ></v-list-item
        >
  
        <!-- ACCOUNT -->
        <VListItem
          title="Accounts"
          prepend-icon="mdi-account-box-multiple"
          value="Account"
          @click="$router.push({name : 'accounts'})"
        >
          <VTooltip v-if="rail" activator="parent" location="bottom"
            >Accounts</VTooltip
          ></VListItem
        >
  
        <!-- SETUP -->
        <v-list-group value="Setup">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Setup"
              prepend-icon="mdi-cog"
            ></v-list-item>
            <v-tooltip v-if="rail" activator="parent" location="bottom"
              >Setup</v-tooltip
            >
          </template>
  
          <v-list-item
            v-for="([title, icon], i) in setup"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </VNavigationDrawer>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const drawer = ref(true);
  const rail = ref(true);
  
  const open = ref(null);
  
  const recruitment = [
    ["Job Opportunities", "mdi-list-box"],
    ["Appointment", "mdi-calendar-clock"],
  ];
  
  const hris = [
    ["Employee", "mdi-account-group"],
    ["Shift", "mdi-calendar-month"],
    ["Attendance", "mdi-note-check"],
    ["Leave", "mdi-island"],
    ["Overtime", "mdi-clock-time-eight"],
    ["Undertime", "mdi-clock-time-four-outline"],
    ["Holiday", "mdi-newspaper-variant"],
    ["Events", "mdi-party-popper"],
  ];
  
  const payroll = [
    ["Generate", "mdi-compost"],
    ["Group", "mdi-group"],
    ["Cycle", "mdi-recycle-variant"],
  ];
  
  // const account = [
  //   ["Management", "mdi-account-multiple-outline"],
  //   ["Settings", "mdi-cog-outline"],
  // ];
  
  const setup = [
    ["SSS", "mdi-alpha-s-box"],
    ["Philhealth", "mdi-alpha-p-box"],
    ["Pagibig", "mdi-hand-extended"],
  ];
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