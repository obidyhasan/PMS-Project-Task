import z from "zod";

export const awardSchema = z.object({
  id: z.string().optional(),
  award: z.string().min(1, "Award name is required"),
  description: z.string().min(1, "Description is required"),
  giftItem: z.string().min(1, "Gift item is required"),
  date: z.string().min(1, "Date is required"),
  employeeName: z.string().min(1, "Employee name is required"),
  awardBy: z.string().min(1, "Awarded by is required"),
});
