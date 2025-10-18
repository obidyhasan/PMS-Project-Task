import { configureStore } from "@reduxjs/toolkit";
import employeePerformanceReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSlice";
import employeeSalaryReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSalarySlice";

export const store = configureStore({
  reducer: {
    employeePerformance: employeePerformanceReducer,
    employeeSalary: employeeSalaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
