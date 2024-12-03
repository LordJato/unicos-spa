<template>
    <div id="dashboard">
      <VContainer fluid>
        <VRow>
          <VCol cols="12" md="4">
            <VCard>
              <VRow justify="center" align="center">
                <VCol>
                  <VList lines="two">
                    <VListItem>
                      <div class="mb-4">
                        <div
                          class="pa-4 bg-primary rounded-circle d-inline-block"
                        >
                          <v-icon icon="mdi-island"></v-icon>
                        </div>
                      </div>
                      <VListItemTitle class="font-weight-bold">
                        LEAVE
                      </VListItemTitle>
                      <VListItemSubtitle
                        class="font-weight-black text-subtitle-1"
                      >
                        10
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol class="d-flex justify-end">
                  <v-avatar size="100" class="ma-3" tile>
                    <v-img :src="leaveImg" />
                  </v-avatar>
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
                        <div class="pa-4 bg-error rounded-circle d-inline-block">
                          <v-icon icon="mdi-clock-time-eight"></v-icon>
                        </div>
                      </div>
                      <VListItemTitle class="font-weight-bold">
                        OVERTIME
                      </VListItemTitle>
                      <VListItemSubtitle
                        class="font-weight-black text-subtitle-1"
                      >
                        7
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol class="d-flex justify-end">
                  <v-avatar size="100" class="ma-3" tile>
                    <v-img
                      :src="overtimeImg"
                    />
                  </v-avatar>
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
                        <div
                          class="pa-4 bg-secondary rounded-circle d-inline-block"
                        > <v-icon icon="mdi-clock-time-four-outline"></v-icon></div>
                      </div>
                      <VListItemTitle class="font-weight-bold">
                        UNDERTIME
                      </VListItemTitle>
                      <VListItemSubtitle
                        class="font-weight-black text-subtitle-1"
                      >
                        3
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol class="d-flex justify-end">
                  <v-avatar size="100" class="ma-3" tile>
                    <v-img
                      :src="undertimeImg"
                    />
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
  
  <style>
  </style>