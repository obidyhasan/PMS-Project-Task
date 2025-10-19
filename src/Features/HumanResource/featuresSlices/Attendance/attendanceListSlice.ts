import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Attendance } from "../../types";
import type { RootState } from "@/Redux/store";
import { AttendanceData } from "../../data/AttendanceListData";

const generateId = (): string => {
  return `ATT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

interface AttendanceState {
  attendances: Attendance[];
  searchQuery: string;
}

const initialState: AttendanceState = {
  attendances: AttendanceData,
  searchQuery: "",
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

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  setAttendances,
  setSearchQuery,
} = attendanceSlice.actions;

export const selectAttendances = (state: RootState) => {
  const { attendances, searchQuery } = state.attendance;
  if (!searchQuery) return attendances;

  const query = searchQuery.toLowerCase();
  return attendances.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.employeeId.toLowerCase().includes(query)
  );
};

export const selectAttendanceById = (state: RootState, id: string) =>
  state.attendance.attendances.find((item) => item.id === id) ?? null;

export default attendanceSlice.reducer;
