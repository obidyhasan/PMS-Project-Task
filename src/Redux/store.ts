import { configureStore } from "@reduxjs/toolkit";
import employeePerformanceReducer from "../Features/HumanResource/featuresSlices/Employee/employeeSlice";

export const store = configureStore({
  reducer: {
    employeePerformance: employeePerformanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
