import CompanyEvent from "@/views/setup/CompanyEventView.vue";
import CompanyView from "@/views/setup/CompanyView.vue";
import DepartmentView from "@/views/setup/DepartmentView.vue";
import HolidayView from "@/views/setup/HolidayView.vue";
import { RouteRecordRaw } from "vue-router";

const setupRoutes: RouteRecordRaw[] = [
  {
    path: "setup",
    children: [
      {
        path: "companies",
        name: "SetupCompany",
        component: CompanyView,
        meta: {
          title: "Company",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-company"],
        },
      },
      {
        path: "departments",
        name: "SetupDepartment",
        component: DepartmentView,
        meta: {
          title: "Department",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-department"],
        },
      },
      {
        path: "company-events",
        name: "SetupCompanyEvent",
        component: CompanyEvent,
        meta: {
          title: "CompanyEvent",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-company-event"],
        },
      },
      {
        path: "holidays",
        name: "SetupHoliday",
        component: HolidayView,
        meta: {
          title: "Holiday",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-holiday"],
        },
      },
      
    ],
  },
];

export default setupRoutes;
