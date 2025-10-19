import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EmployeeSalaries } from "../../data/EmployeeSalaryData";
import type { EmployeeSalary } from "../../types";
import type { RootState } from "@/Redux/store";

interface EmployeeSalaryState {
  salaries: EmployeeSalary[];
  searchQuery: string;
}

const initialState: EmployeeSalaryState = {
  salaries: EmployeeSalaries,
  searchQuery: "",
};

const employeeSalarySlice = createSlice({
  name: "employeeSalary",
  initialState,
  reducers: {
    updateSalary: (
      state,
      action: PayloadAction<{
        employeeId: string;
        updatedData: Partial<EmployeeSalary>;
      }>
    ) => {
      const { employeeId, updatedData } = action.payload;
      const index = state.salaries.findIndex(
        (item) => item.employeeId === employeeId
      );
      if (index !== -1) {
        state.salaries[index] = { ...state.salaries[index], ...updatedData };
      }
    },
    setEmployeeSalarySearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { updateSalary, setEmployeeSalarySearchQuery } =
  employeeSalarySlice.actions;

export const selectEmployeeSalaries = (state: RootState) =>
  state.employeeSalary.salaries.filter(
    (salary) =>
      salary.paidBy
        .toLowerCase()
        .includes(state.employeeSalary.searchQuery.toLowerCase()) ||
      salary.employeeId
        .toLowerCase()
        .includes(state.employeeSalary.searchQuery.toLowerCase())
  );

export default employeeSalarySlice.reducer;
