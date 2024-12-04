<template>
  <div id="dashboard">
    <VContainer fluid>
      <VRow>
        <VCol cols="12" md="4">
          <VCard elevation="2">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  10
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-black text-subtitle-1 text-overline mt-2">
                  Leave
                </VListItemSubtitle>
                <template v-slot:append>
                  <VImg :src="leaveImg" max-width="80" width="60" cover />
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard elevation="2">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  7
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-black text-overline mt-2">
                  Overtime
                </VListItemSubtitle>
                <template v-slot:append>
                  <VImg :src="overtimeImg" max-width="80" width="60" cover />
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard elevation="2">
            <VList lines="two" class="px-8 py-2">
              <VListItem>
                <VListItemTitle class="font-weight-bold text-h6">
                  7
                </VListItemTitle>
                <VListItemSubtitle class="font-weight-black text-overline mt-2">
                  Undertime
                </VListItemSubtitle>
                <template v-slot:append>
                  <VImg :src="undertimeImg" max-width="80" width="60" cover />
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
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
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import undertimeImg from "@/assets/img/dashboard/undertime.svg"
import overtimeImg from "@/assets/img/dashboard/overtime.svg"
import leaveImg from "@/assets/img/dashboard/leave.svg"
</script>

<style></style>