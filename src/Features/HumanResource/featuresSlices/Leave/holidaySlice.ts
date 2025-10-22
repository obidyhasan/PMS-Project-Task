import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/Redux/store";
import type { IHoliday } from "../../types";
import { holidayData } from "../../data/HolidayData";
import { calculateDays } from "../../utils/holiday";

interface HolidayState {
  holidays: IHoliday[];
}

const initialState: HolidayState = {
  holidays: holidayData,
};

const holidaySlice = createSlice({
  name: "holiday",
  initialState,
  reducers: {
    addHoliday: (
      state,
      action: PayloadAction<Omit<IHoliday, "id" | "numberOfDays">>
    ) => {
      const numberOfDays = calculateDays(
        action.payload.fromDate,
        action.payload.toDate
      );
      const newHoliday = {
        ...action.payload,
        id: nanoid(),
        numberOfDays,
      };
      state.holidays.push(newHoliday);
    },
    deleteHoliday: (state, action: PayloadAction<string>) => {
      state.holidays = state.holidays.filter((h) => h.id !== action.payload);
    },
    editHoliday: (state, action: PayloadAction<IHoliday>) => {
      const index = state.holidays.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        const updated = {
          ...action.payload,
          numberOfDays: calculateDays(
            action.payload.fromDate,
            action.payload.toDate
          ),
        };
        state.holidays[index] = updated;
      }
    },
  },
});

export const selectHolidays = (state: RootState) => state.holiday.holidays;
export const { addHoliday, deleteHoliday, editHoliday } = holidaySlice.actions;
export default holidaySlice.reducer;
