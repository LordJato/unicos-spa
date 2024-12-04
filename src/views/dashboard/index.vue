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
                  <v-img :src="leaveImg" width="80" cover />
                </template>
              </VListItem>
            </VList>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard>
            <VRow justify="center" align="center" class="px-8 py-1">
              <VCol>
                <VList lines="two">
                  <VListItem>
                    <VListItemTitle class="font-weight-bold text-h5">
                      Overtime
                    </VListItemTitle>
                    <VListItemSubtitle class="text-h6 mt-4">
                      7
                    </VListItemSubtitle>
                  </VListItem>
                </VList>
              </VCol>
              <VCol class="d-flex justify-end">
                <v-img :src="overtimeImg" max-width="80" cover />
              </VCol>
            </VRow>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard>
            <VRow justify="center" align="center">
              <VCol>
                <VList lines="two">
                  <VListItem>
                    <div class="mb-4">
                      <div class="pa-4 bg-secondary rounded-circle d-inline-block"> <v-icon
                          icon="mdi-clock-time-four-outline"></v-icon></div>
                    </div>
                    <VListItemTitle class="font-weight-bold">
                      UNDERTIME
                    </VListItemTitle>
                    <VListItemSubtitle class="font-weight-black text-subtitle-1">
                      3
                    </VListItemSubtitle>
                  </VListItem>
                </VList>
              </VCol>
              <VCol class="d-flex justify-end">
                <v-avatar size="100" class="ma-3" tile>
                  <v-img :src="undertimeImg" />
                </v-avatar>
              </VCol>
            </VRow>
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