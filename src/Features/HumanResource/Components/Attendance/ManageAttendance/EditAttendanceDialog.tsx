import { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { updateAttendance } from "@/Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type { Attendance } from "@/Features/HumanResource/types";
import {
  calculateStay,
  convertTo12HourFormat,
  to24HourFormat,
} from "@/Features/HumanResource/utils/attendance";
import { employees } from "@/Features/HumanResource/data/AttendanceListData";

const formSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  date: z.string().min(1, "Date is required"),
  checkIn: z.string().min(1, "Check-in time is required"),
  checkOut: z.string().optional(),
});

interface EditAttendanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attendance: Attendance;
}

export const EditAttendanceDialog = ({
  isOpen,
  onClose,
  attendance,
}: EditAttendanceDialogProps) => {
  const dispatch = useDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: attendance.name,
      employeeId: attendance.employeeId,
      date: attendance.date || today,
      checkIn: attendance.checkIn ? to24HourFormat(attendance.checkIn) : "",
      checkOut: attendance.checkOut ? to24HourFormat(attendance.checkOut) : "",
    },
  });

  useEffect(() => {
    form.reset({
      name: attendance.name,
      employeeId: attendance.employeeId,
      date: attendance.date || today,
      checkIn: attendance.checkIn ? to24HourFormat(attendance.checkIn) : "",
      checkOut: attendance.checkOut ? to24HourFormat(attendance.checkOut) : "",
    });
  }, [attendance, form, today]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const checkIn12 = convertTo12HourFormat(values.checkIn);
      const checkOut12 = values.checkOut
        ? convertTo12HourFormat(values.checkOut)
        : undefined;
      const stay = calculateStay(values.checkIn, values.checkOut);

      dispatch(
        updateAttendance({
          id: attendance.id as string,
          updatedData: {
            ...values,
            checkIn: checkIn12,
            checkOut: checkOut12,
            stay,
          },
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
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>
            Update the attendance record below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Employee Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || attendance.name}
                      onValueChange={(val) => {
                        field.onChange(val);

                        const selectedEmployee = employees.find(
                          (e) => e.name === val
                        );
                        if (selectedEmployee) {
                          form.setValue("employeeId", selectedEmployee.id);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employee Name" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.name}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee ID */}
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || attendance.employeeId}
                      onValueChange={(val) => {
                        field.onChange(val);

                        const selectedEmployee = employees.find(
                          (e) => e.id === val
                        );
                        if (selectedEmployee) {
                          form.setValue("name", selectedEmployee.name);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employee ID" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="pointer-events-none">Date</FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
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
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Check In */}
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check In</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        step="1"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Check Out */}
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Out</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        step="1"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default EditAttendanceDialog;
