import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/Redux/store";
import { leaveTypeData } from "../../data/LeaveTypeData";

export interface ILeaveType {
  id?: string;
  leaveType: string;
  leaveDays: string;
}

interface LeaveTypeState {
  leaveTypes: ILeaveType[];
}

const initialState: LeaveTypeState = {
  leaveTypes: leaveTypeData,
};

const leaveTypeSlice = createSlice({
  name: "leaveType",
  initialState,
  reducers: {
    addLeaveType: (state, action: PayloadAction<Omit<ILeaveType, "id">>) => {
      const newLeaveType = { ...action.payload, id: nanoid() };
      state.leaveTypes.push(newLeaveType);
    },
    editLeaveType: (state, action: PayloadAction<ILeaveType>) => {
      const index = state.leaveTypes.findIndex(
        (l) => l.id === action.payload.id
      );
      if (index !== -1) {
        state.leaveTypes[index] = action.payload;
      }
    },
    deleteLeaveType: (state, action: PayloadAction<string>) => {
      state.leaveTypes = state.leaveTypes.filter(
        (l) => l.id !== action.payload
      );
    },
  },
});

export const selectLeaveTypes = (state: RootState) =>
  state.leaveType.leaveTypes;
export const { addLeaveType, editLeaveType, deleteLeaveType } =
  leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;
