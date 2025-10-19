export const convertTo12HourFormat = (time24: string) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = Number(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
};

export const to24HourFormat = (time12?: string) => {
  if (!time12) return "";
  const [time, modifier] = time12.split(" ");
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const calculateStay = (checkIn: string, checkOut?: string) => {
  if (!checkOut) return "N/A";
  const [inH, inM] = checkIn.split(":").map(Number);
  const [outH, outM] = checkOut.split(":").map(Number);
  const inTime = inH * 60 + inM;
  const outTime = outH * 60 + outM;
  const diff = outTime - inTime;
  if (diff <= 0) return "0h";
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  return `${hours}h${mins > 0 ? ` ${mins}m` : ""}`;
};

// Sorting
export const sortByKey = <T>(
  data: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
