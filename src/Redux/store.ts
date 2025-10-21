import { configureStore } from "@reduxjs/toolkit";
import employeePerformanceReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSlice";
import employeeSalaryReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSalarySlice";
import attendanceReducer from "../Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";
import awardReducer from "@/Features/HumanResource/featuresSlices/Award/awardListSlice";
import leaveApplicationReducer from "@/Features/HumanResource/featuresSlices/Leave/leaveApplicationSlice";

export const store = configureStore({
  reducer: {
    employeePerformance: employeePerformanceReducer,
    employeeSalary: employeeSalaryReducer,
    attendance: attendanceReducer,
    award: awardReducer,
    leaveApplication: leaveApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
