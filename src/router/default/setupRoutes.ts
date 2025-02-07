import DepartmentView from "@/views/setup/DepartmentView.vue";
import { RouteRecordRaw } from "vue-router";

const setupRoutes: RouteRecordRaw[] = [
  {
    path: "setup",
    children: [
      {
        path: "department",
        name: "SetupDepartment",
        component: DepartmentView,
        meta: {
          title: "Department",
          middleware: ["auth", "checkPermissions"],
          permissions: ["view-all-department"],
        },
      },
    ],
  },
];

export default setupRoutes;
