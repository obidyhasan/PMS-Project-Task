import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Attendance } from "../../types";
import type { RootState } from "@/Redux/store";
import { AttendanceData } from "../../data/AttendanceListData";

const generateId = (): string => {
  return `ATT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

interface AttendanceState {
  attendances: Attendance[];
}

const initialState: AttendanceState = {
  attendances: AttendanceData,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    addAttendance: (state, action: PayloadAction<Omit<Attendance, "id">>) => {
      const newItem: Attendance = { id: generateId(), ...action.payload };
      state.attendances.push(newItem);
    },

    updateAttendance: (
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<Attendance> }>
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.attendances.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.attendances[index] = {
          ...state.attendances[index],
          ...updatedData,
        };
      }
    },

    deleteAttendance: (state, action: PayloadAction<string>) => {
      state.attendances = state.attendances.filter(
        (item) => item.id !== action.payload
      );
    },

    setAttendances: (state, action: PayloadAction<Attendance[]>) => {
      state.attendances = action.payload;
    },
  },
});

export const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  setAttendances,
} = attendanceSlice.actions;

export const selectAttendances = (state: RootState) =>
  state.attendance.attendances;

export const selectAttendanceById = (state: RootState, id: string) =>
  state.attendance.attendances.find((item) => item.id === id) ?? null;

export default attendanceSlice.reducer;
