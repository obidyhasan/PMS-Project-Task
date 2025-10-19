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
import { useDispatch } from "react-redux";
import { updateAttendance } from "@/Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";
import type { Attendance } from "../../types";
import {
  calculateStay,
  convertTo12HourFormat,
  to24HourFormat,
} from "../../utils/attendance";
import { employees } from "../../data/AttendanceListData";

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} defaultValue={today} />
                  </FormControl>
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
                      <Input type="time" {...field} />
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
                      <Input type="time" {...field} />
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
