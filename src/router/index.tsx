import App from "@/App";
import Attendance from "@/Features/HumanResource/Pages/Attendance/Attendance";
import AttendanceReport from "@/Features/HumanResource/Pages/Attendance/AttendanceReport";
import NewAward from "@/Features/HumanResource/Pages/Award/NewAward";
import EmployeePerformance from "@/Features/HumanResource/Pages/Employee/EmployeePerformance";
import ManageEmployeeSalary from "@/Features/HumanResource/Pages/Employee/ManageEmployeeSalary";
import Holiday from "@/Features/HumanResource/Pages/Leave/Holiday";
import LeaveApplication from "@/Features/HumanResource/Pages/Leave/LeaveApplication";
import LeaveType from "@/Features/HumanResource/Pages/Leave/LeaveType";
import WeeklyHoliday from "@/Features/HumanResource/Pages/Leave/WeeklyHoliday";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: EmployeePerformance,
      },
      {
        path: "/manage-employee",
        Component: ManageEmployeeSalary,
      },
      {
        path: "/attendance",
        Component: Attendance,
      },
      {
        path: "/attendance-report",
        Component: AttendanceReport,
      },
      {
        path: "/new-award",
        Component: NewAward,
      },
      {
        path: "/leave-application",
        Component: LeaveApplication,
      },
      {
        path: "/weekly-holiday",
        Component: WeeklyHoliday,
      },
      {
        path: "/holiday",
        Component: Holiday,
      },
      {
        path: "/leave-type",
        Component: LeaveType,
      },
    ],
  },
]);
