import { configureStore } from "@reduxjs/toolkit";
import employeePerformanceReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSlice";
import employeeSalaryReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSalarySlice";
import attendanceReducer from "../Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";

export const store = configureStore({
  reducer: {
    employeePerformance: employeePerformanceReducer,
    employeeSalary: employeeSalaryReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
