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
export interface IAward {
  id?: string;
  award: string;
  description: string;
  giftItem: string;
  employeeName: string;
  date: string;
  awardBy: string;
}

export interface ILeaveApplication {
  id?: string;
  name: string;
  leaveType: string;
  applicationStartDate: string;
  applicationEndDate: string;
  approveStartDate: string;
  approvedEndDate: string;
  applyDay: string;
  approvedDay: string;
}

export interface IWeeklyHoliday {
  id?: string;
  day: string;
}

export interface IHoliday {
  id?: string;
  holidayName: string;
  fromDate: string;
  toDate: string;
  numberOfDays: string;
}

export interface ILeaveType {
  id?: string;
  leaveType: string;
  leaveDays: string;
}
