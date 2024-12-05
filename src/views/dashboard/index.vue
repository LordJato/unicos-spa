<template>
  <div id="dashboard">
    <VContainer fluid>
      <VRow>
        <VCol cols="12" md="3">
          <VCard elevation="2">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  7
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-bold text-overline mt-2">
                  Overtime Request
                </VListItemSubtitle>
                <template v-slot:append>
                  <v-avatar size="60" color="primary">
                    <v-icon class="shadow" color="white-primary" size="30">mdi-timer-plus</v-icon>
                  </v-avatar>
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
        <VCol cols="12" md="3">
          <VCard elevation="2">
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
        <VCol cols="12" md="3">
          <VCard elevation="3">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  10
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-black text-subtitle-1 text-overline mt-2">
                  Leave Request
                </VListItemSubtitle>
                <template v-slot:append>
                  <v-avatar size="60" color="secondary">
                    <v-icon class="shadow" color="white-primary" size="30">mdi-account-off</v-icon>
                  </v-avatar>
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
        <VCol cols="12" md="3">
          <VCard elevation="2">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  2
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-black text-overline mt-2">
                  Emergency Leave
                </VListItemSubtitle>
                <template v-slot:append>
                  <v-avatar size="60" color="error">
                    <v-icon class="shadow" color="white-primary" size="30">mdi-exit-run</v-icon>
                  </v-avatar>
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="8">
          <VCard>
            <VCardTitle> Active Job Opportunities </VCardTitle>
            <VCardText>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Applicants</th>
                    <th class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Junior Web Developer</td>
                    <td>2</td>
                    <td>
                      <v-icon size="small" class="me-2"> mdi-eye </v-icon>
                      <v-icon size="small" class="me-2"> mdi-delete </v-icon>
                    </td>
                  </tr>
                  <tr>
                    <td>Senior Web Developer</td>
                    <td>3</td>
                    <td>
                      <v-icon size="small" class="me-2"> mdi-eye </v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VSheet color="primary">
            <VCalendar color="primary" hide-week-number></VCalendar>
          </VSheet>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import { VCalendar } from 'vuetify/labs/VCalendar'
</script>

<style>
.shadow {
  filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
}
</style>