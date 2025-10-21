import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILeaveApplication } from "../../types";
import { LeaveApplicationData } from "../../data/LeaveApplicationData";
import type { RootState } from "@/Redux/store";

const generateId = (): string => {
  return `LEAVE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

interface LeaveApplicationState {
  leaveApplications: ILeaveApplication[];
  searchQuery: string;
}

const initialState: LeaveApplicationState = {
  leaveApplications: LeaveApplicationData,
  searchQuery: "",
};

export const leaveApplicationSlice = createSlice({
  name: "leaveApplication",
  initialState,
  reducers: {
    addLeaveApplication: (state, action: PayloadAction<ILeaveApplication>) => {
      const newLeave = { ...action.payload, id: generateId() };
      state.leaveApplications.push(newLeave);
    },
    updateLeaveApplication: (
      state,
      action: PayloadAction<{
        id: string;
        updatedData: Partial<ILeaveApplication>;
      }>
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.leaveApplications.findIndex((l) => l.id === id);
      if (index !== -1) {
        state.leaveApplications[index] = {
          ...state.leaveApplications[index],
          ...updatedData,
        };
      }
    },
    deleteLeaveApplication: (state, action: PayloadAction<string>) => {
      state.leaveApplications = state.leaveApplications.filter(
        (l) => l.id !== action.payload
      );
    },
    setLeaveApplicationSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addLeaveApplication,
  updateLeaveApplication,
  deleteLeaveApplication,
  setLeaveApplicationSearchQuery,
} = leaveApplicationSlice.actions;

export const selectLeaveApplications = (state: RootState) =>
  state.leaveApplication.leaveApplications;

export const selectLeaveApplicationSearchQuery = (state: RootState) =>
  state.leaveApplication.searchQuery;

export default leaveApplicationSlice.reducer;
