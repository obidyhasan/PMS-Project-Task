import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/Redux/store";
import type { IAward } from "../../types";
import { AwardData } from "../../data/AwardData";

const generateId = (): string =>
  `AWD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

interface AwardState {
  awards: IAward[];
  searchQuery: string;
}

const initialState: AwardState = {
  awards: AwardData,
  searchQuery: "",
};

const awardSlice = createSlice({
  name: "award",
  initialState,
  reducers: {
    addAward: (state, action: PayloadAction<Omit<IAward, "id">>) => {
      state.awards.push({ id: generateId(), ...action.payload });
    },
    updateAward: (
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<IAward> }>
    ) => {
      const { id, updatedData } = action.payload;
      const idx = state.awards.findIndex((a) => a.id === id);
      if (idx !== -1)
        state.awards[idx] = { ...state.awards[idx], ...updatedData };
    },
    deleteAward: (state, action: PayloadAction<string>) => {
      state.awards = state.awards.filter((a) => a.id !== action.payload);
    },
    setAwards: (state, action: PayloadAction<IAward[]>) => {
      state.awards = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addAward, updateAward, deleteAward, setAwards, setSearchQuery } =
  awardSlice.actions;

export const selectAwards = (state: RootState) => {
  const { awards, searchQuery } = state.award;
  if (!searchQuery) return awards;
  const q = searchQuery.toLowerCase();
  return awards.filter(
    (item) =>
      item.employeeName.toLowerCase().includes(q) ||
      item.award.toLowerCase().includes(q) ||
      item.awardBy.toLowerCase().includes(q)
  );
};

export const selectAwardById = (state: RootState, id: string) =>
  state.award.awards.find((a) => a.id === id) ?? null;

export default awardSlice.reducer;
