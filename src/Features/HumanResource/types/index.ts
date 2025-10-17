export interface IEmployeePerformance {
  id: string;
  managePerformance: string;
  employeeId: string;
  note: string;
  date: string;
  numberOfStar: string;
  status: "Completed" | "In Progress" | "Scheduled";
  noteBy: string;
  updatedBy: string;
}
