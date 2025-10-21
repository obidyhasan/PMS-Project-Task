import type { ILeaveApplication } from "../types";

export const LeaveApplicationData: ILeaveApplication[] = [
  {
    id: "LEAVE-001",
    name: "Rakib Hasan",
    leaveType: "Casual Leave",
    applicationStartDate: "2025-01-05",
    applicationEndDate: "2025-01-07",
    approveStartDate: "2025-01-06",
    approvedEndDate: "2025-01-07",
    applyDay: "3",
    approvedDay: "2",
  },
  {
    id: "LEAVE-002",
    name: "Sadia Akter",
    leaveType: "Sick Leave",
    applicationStartDate: "2025-02-10",
    applicationEndDate: "2025-02-12",
    approveStartDate: "2025-02-11",
    approvedEndDate: "2025-02-12",
    applyDay: "3",
    approvedDay: "2",
  },
];
