import { differenceInDays, parseISO } from "date-fns";
export const calculateDays = (fromDate: string, toDate: string): string => {
  try {
    const days = differenceInDays(parseISO(toDate), parseISO(fromDate)) + 1;
    return days.toString();
  } catch {
    return "0";
  }
};
