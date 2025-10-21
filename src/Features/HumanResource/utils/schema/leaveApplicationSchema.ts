import { z } from "zod";

export const leaveApplicationSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  leaveType: z.string().min(1, "Leave type is required"),
  applicationStartDate: z.string().min(1, "Application start date is required"),
  applicationEndDate: z.string().min(1, "Application end date is required"),
  approveStartDate: z.string().optional(),
  approvedEndDate: z.string().optional(),
  applyDay: z.string().optional(),
  approvedDay: z.string().optional(),
});
