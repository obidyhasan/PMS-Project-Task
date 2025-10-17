import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/Redux/store";
import { employeePerformanceData } from "../../data/EmployeePerformanceData";
import type { IEmployeePerformance } from "../../types";

interface EmployeePerformanceState {
  performances: IEmployeePerformance[];
}

const initialState: EmployeePerformanceState = {
  performances: employeePerformanceData,
};

const employeePerformanceSlice = createSlice({
  name: "employeePerformance",
  initialState,
  reducers: {
    addPerformance: (
      state,
      action: PayloadAction<Omit<IEmployeePerformance, "id">>
    ) => {
      const newPerformance = { ...action.payload, id: nanoid() };
      state.performances.push(newPerformance);
    },
    deletePerformance: (state, action: PayloadAction<string>) => {
      state.performances = state.performances.filter(
        (p) => p.id !== action.payload
      );
    },
    editPerformance: (state, action: PayloadAction<IEmployeePerformance>) => {
      const index = state.performances.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) state.performances[index] = action.payload;
    },
  },
});

export const selectEmployeePerformances = (state: RootState) =>
  state.employeePerformance.performances;

export const { addPerformance, deletePerformance, editPerformance } =
  employeePerformanceSlice.actions;

export default employeePerformanceSlice.reducer;
