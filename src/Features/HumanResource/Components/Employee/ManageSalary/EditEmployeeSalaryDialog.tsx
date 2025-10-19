import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

import { useDispatch } from "react-redux";
import { updateSalary } from "@/Features/HumanResource/featuresSlices/Employee/employeeSalarySlice";
import type { EmployeeSalary } from "@/Features/HumanResource/types";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const manageSalarySchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  totalSalary: z.string().min(1, "Total Salary is required"),
  workingHour: z.string().min(1, "Working hours is required"),
  workingPeriod: z.string().min(1, "Working period is required"),
  paymentType: z.enum(["Bank Transfer", "Check", "Cash", "Credit Card"], {
    message: "Payment type is required",
  }),
  date: z.string().min(1, "Date is required"),
  paidBy: z.string().min(1, "Paid by is required"),
});

interface EditSalaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  salary: EmployeeSalary;
}

export const EditEmployeeSalaryDialog = ({
  isOpen,
  onClose,
  salary,
}: EditSalaryDialogProps) => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof manageSalarySchema>>({
    resolver: zodResolver(manageSalarySchema),
    defaultValues: {
      ...salary,
      paymentType:
        salary.paymentType === "Bank Transfer" ||
        salary.paymentType === "Check" ||
        salary.paymentType === "Cash" ||
        salary.paymentType === "Credit Card"
          ? salary.paymentType
          : "Bank Transfer",
    },
  });
  useEffect(() => {
    form.reset(salary);
  }, [salary, form]);

  const onSubmit = async (values: z.infer<typeof manageSalarySchema>) => {
    try {
      dispatch(
        updateSalary({
          employeeId: salary.employeeId,
          updatedData: values,
        })
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Employee Salary</DialogTitle>
          <DialogDescription>
            Update the employee salary record below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employee ID" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">EMP001</SelectItem>
                        <SelectItem value="EMP002">EMP002</SelectItem>
                        <SelectItem value="EMP003">EMP003</SelectItem>
                        <SelectItem value="EMP004">EMP004</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Salary (BDT)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Hour</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Period</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Payment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid By</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeSalaryDialog;
