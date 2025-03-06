interface SubMenuItem {
  title: string;
  icon: string;
  link: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  listGroup?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: "mdi-view-dashboard", link: "Dashboard" },
  {
    title: "Recruitment",
    icon: "mdi-account-search",
    listGroup: [
      {
        title: "Opportunities",
        icon: "mdi-list-box",
        link: "RecruitmentOpportunities",
      },
      {
        title: "Appointment",
        icon: "mdi-calendar-clock",
        link: "RecruitmentAppointment",
      },
    ],
  },
  {
    title: "HRIS",
    icon: "mdi-folder-account",
    listGroup: [
      { title: "Employees", icon: "mdi-account-group", link: "employees" },
      { title: "Shift", icon: "mdi-calendar-month", link: "shift" },
      { title: "Attendance", icon: "mdi-note-check", link: "attendance" },
      { title: "Leave", icon: "mdi-island", link: "leave" },
      { title: "Overtime", icon: "mdi-clock-time-eight", link: "overtime" },
      {
        title: "Undertime",
        icon: "mdi-clock-time-four-outline",
        link: "undertime",
      },
      { title: "Holiday", icon: "mdi-newspaper-variant", link: "holiday" },
      { title: "Events", icon: "mdi-party-popper", link: "events" },
    ],
  },
  {
    title: "Payroll",
    icon: "mdi-notebook",
    listGroup: [
      { title: "Generate", icon: "mdi-compost", link: "payrollGenerate" },
      { title: "Group", icon: "mdi-group", link: "payrollGroup" },
      { title: "Cycle", icon: "mdi-recycle-variant", link: "payrollCycle" },
    ],
  },
  { title: "Calendar", icon: "mdi-calendar", link: "calendar" },
  { title: "Accounts", icon: "mdi-account-box-multiple", link: "accounts" },
  {
    title: "Setup",
    icon: "mdi-cog",
    listGroup: [
      { title: "Company", icon: "mdi-domain", link: "SetupCompany" },
      { title: "Department", icon: "mdi-alpha-s-box", link: "SetupDepartment" },
      { title: "SSS", icon: "mdi-alpha-s-box", link: "SetupSSS" },
      { title: "Philhealth", icon: "mdi-alpha-p-box", link: "SetupPhilhealth" },
      { title: "Pagibig", icon: "mdi-hand-extended", link: "SetupPagibig" },
    ],
  },
];
