import type { Attendance } from "../types";

export const employees = [
  { name: "Rakib Hasan", id: "EMP001" },
  { name: "Jannat Ara", id: "EMP002" },
  { name: "Hasan Mahmud", id: "EMP003" },
  { name: "Sadia Akter", id: "EMP004" },
  { name: "Tania Rahman", id: "EMP005" },
  { name: "Arif Hossain", id: "EMP006" },
  { name: "Mahi Karim", id: "EMP007" },
  { name: "Nusrat Jahan", id: "EMP008" },
];

export const AttendanceData: Attendance[] = [
  {
    id: "ATT-001",
    name: "Rakib Hasan",
    employeeId: "EMP001",
    date: "2025-10-19",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    stay: "8h",
  },
  {
    id: "ATT-002",
    name: "Jannat Ara",
    employeeId: "EMP002",
    date: "2025-10-19",
    checkIn: "09:15 AM",
    checkOut: "05:10 PM",
    stay: "7h 55m",
  },
  {
    id: "ATT-003",
    name: "Hasan Mahmud",
    employeeId: "EMP003",
    date: "2025-10-18",
    checkIn: "08:45 AM",
    checkOut: "04:45 PM",
    stay: "8h",
  },
  {
    id: "ATT-004",
    name: "Sadia Akter",
    employeeId: "EMP004",
    date: "2025-10-18",
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    stay: "8h 30m",
  },
];
