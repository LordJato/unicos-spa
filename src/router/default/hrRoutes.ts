import DesignationView from "@/views/hr/DesignationView.vue";
import EmployeeStatusView from "@/views/hr/EmployeeStatusView.vue";
import EmployeeTypeView from "@/views/hr/EmployeeTypeView.vue";
import { RouteRecordRaw } from "vue-router";

const recruitmentRoutes: RouteRecordRaw[] = [
  {
    path: "hr",
    children: [
      {
        path: "designations",
        name: "HrDesignation",
        component: DesignationView,
        meta: {
          title: "Designation",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-designation"],
        },
      },
      {
        path: "employee-types",
        name: "HrEmployeeTypes",
        component: EmployeeTypeView,
        meta: {
          title: "Employee Types",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-employee-types"],
        },
      },
      {
        path: "employee-statuses",
        name: "HrEmployeStatuses",
        component: EmployeeStatusView,
        meta: {
          title: "Employee Statuses",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-employee-statuses"],
        },
      },
    ],
  },
];

export default recruitmentRoutes;