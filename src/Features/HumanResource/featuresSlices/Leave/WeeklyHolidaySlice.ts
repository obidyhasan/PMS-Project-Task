import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/Redux/store";
import type { IWeeklyHoliday } from "../../types";
import { weeklyHolidayData } from "../../data/WeeklyHolidayData";

interface WeeklyHolidayState {
  holidays: IWeeklyHoliday[];
}

const initialState: WeeklyHolidayState = {
  holidays: weeklyHolidayData,
};

const weeklyHolidaySlice = createSlice({
  name: "weeklyHoliday",
  initialState,
  reducers: {
    addWeeklyHoliday: (
      state,
      action: PayloadAction<Omit<IWeeklyHoliday, "id">>
    ) => {
      const newHoliday = { ...action.payload, id: nanoid() };
      state.holidays.push(newHoliday);
    },
    deleteWeeklyHoliday: (state, action: PayloadAction<string>) => {
      state.holidays = state.holidays.filter((h) => h.id !== action.payload);
    },
    editWeeklyHoliday: (state, action: PayloadAction<IWeeklyHoliday>) => {
      const index = state.holidays.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) state.holidays[index] = action.payload;
    },
  },
});

export const selectWeeklyHolidays = (state: RootState) =>
  state.weeklyHoliday.holidays;
export const { addWeeklyHoliday, deleteWeeklyHoliday, editWeeklyHoliday } =
  weeklyHolidaySlice.actions;

export default weeklyHolidaySlice.reducer;
