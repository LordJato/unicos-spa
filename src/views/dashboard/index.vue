<template>
  <div id="dashboard">
    <VContainer fluid>
      <VRow>
        <VCol cols="12" md="9">
          <VRow>
            <VCol cols="12" md="4">
              <VCard elevation="6" rounded="lg">
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
              <VCard elevation="6" rounded="lg">
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
              <VCard elevation="6" rounded="lg">
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
                    Performance Metrics Analysis (2024)
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

              <DashboardDonutChart />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="12">
              <DashboardWhosOnline />
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="12" md="3">
          <VRow>
            <VCol>
             <DashboardCalendar />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <DashboardBirthDays />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardDonutChart from "@/components/Dashboard/DonutChart.vue";
import DashboardBirthDays from "@/components/Dashboard/BirthDays.vue";
import DashboardWhosOnline from "@/components/Dashboard/WhosOnline.vue";
import DashboardCalendar from "@/components/Dashboard/Calendar.vue";

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
]);

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

.v-sheet--offset {
  top: -24px;
  position: relative;
}

.v-table>.v-table__wrapper>table>tbody>tr>td:first-child,
.v-table>.v-table__wrapper>table>thead>tr>td:first-child,
.v-table>.v-table__wrapper>table>tfoot>tr>td:first-child {
  padding: 0;
}
</style>