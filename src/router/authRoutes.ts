import { RouteRecordRaw } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import ForgotPassword from "@/views/auth/ForgotPasswordView.vue";
import ResetPassword from "@/views/auth/ResetPasswordView.vue";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "",
        redirect: "/login",
      },
      {
        path: "login",
        name: "Login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "@/views/auth/LoginView.vue"
          ),
        meta: { title: "Login", middleware: ["guest"] },
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/views/auth/RegisterView.vue"
          ),
        meta: { title: "Register", middleware: ["guest"] },
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: { title: "Forgot Password" },
      },
      {
        path: "reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        meta: { title: "Reset Password" },
      },
      
    ],
  },
];

export default authRoutes;
