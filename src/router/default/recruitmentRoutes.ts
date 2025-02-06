import { RouteRecordRaw } from "vue-router";
import OpportunityView from "@/views/recruitment/OpportunityView.vue";

const recruitmentRoutes: RouteRecordRaw[] = [
  {
    path: "/recruitment",
    children: [
      {
        path: "opportunities",
        name: "RecruitmentOpportunities",
        component: OpportunityView,
        meta: {
          title: "Opportunities",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-opportunity"],
        },
      },
      {
        path: "appointments",
        name: "RecruitmentAppointments",
        component: OpportunityView,
        meta: {
          title: "Appointments",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-appointments"],
        },
      },
    ],
  },
];

export default recruitmentRoutes;