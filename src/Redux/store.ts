import { configureStore } from "@reduxjs/toolkit";
import employeePerformanceReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSlice";
import employeeSalaryReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSalarySlice";
import attendanceReducer from "../Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";
import awardReducer from "@/Features/HumanResource/featuresSlices/Award/awardListSlice";
import leaveApplicationReducer from "@/Features/HumanResource/featuresSlices/Leave/leaveApplicationSlice";
import weeklyHolidayReducer from "@/Features/HumanResource/featuresSlices/Leave/WeeklyHolidaySlice";
import holidayReducer from "@/Features/HumanResource/featuresSlices/Leave/holidaySlice";
import leaveTypeReducer from "@/Features/HumanResource/featuresSlices/Leave/leaveTypeSlice";

export const store = configureStore({
  reducer: {
    employeePerformance: employeePerformanceReducer,
    employeeSalary: employeeSalaryReducer,
    attendance: attendanceReducer,
    award: awardReducer,
    leaveApplication: leaveApplicationReducer,
    weeklyHoliday: weeklyHolidayReducer,
    holiday: holidayReducer,
    leaveType: leaveTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
