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

export type PaymentType = "Bank Transfer" | "Check" | "Cash" | "Credit Card";
export interface EmployeeSalary {
  id?: string;
  employeeId: string;
  managePerformance: string;
  totalSalary: string;
  workingHour: string;
  workingPeriod: string;
  paymentType: PaymentType;
  date: string;
  paidBy: string;
}

export interface Attendance {
  id?: string;
  name: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  stay?: string;
}
