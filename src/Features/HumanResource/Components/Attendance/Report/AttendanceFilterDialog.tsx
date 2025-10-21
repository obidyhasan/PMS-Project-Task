import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Attendance } from "@/Features/HumanResource/types";
import { format } from "date-fns";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterType: "date" | "employee" | "dateTime";
  attendanceList: Attendance[];
  onApply: (filtered: Attendance[]) => void;
}

export const AttendanceFilterDialog = ({
  open,
  onOpenChange,
  filterType,
  attendanceList,
  onApply,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isDateCalendarOpen, setIsDateCalendarOpen] = useState(false);
  const [isDateTimeCalendarOpen, setIsDateTimeCalendarOpen] = useState(false);

  const handleApply = () => {
    let filtered = attendanceList;

    if (filterType === "date" && selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      filtered = filtered.filter((item) => item.date === dateStr);
    }

    if (filterType === "employee" && selectedEmployee) {
      filtered = filtered.filter(
        (item) => item.employeeId === selectedEmployee
      );
    }

    if (filterType === "dateTime" && selectedDate && selectedTime) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      filtered = filtered.filter((item) => {
        const itemTime = item.checkIn?.slice(0, 5);
        return item.date === dateStr && itemTime === selectedTime;
      });
    }

    onApply(filtered);
    onOpenChange(false);
    setSelectedDate(undefined);
    setSelectedEmployee("");
    setSelectedTime("");
  };

  const employeeIds = Array.from(
    new Set(attendanceList.map((item) => item.employeeId))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Filter Attendance</DialogTitle>
        </DialogHeader>

        {/* DATE FILTER */}
        {filterType === "date" && (
          <div>
            <Label className="my-2">Date</Label>
            <Popover
              open={!!isDateCalendarOpen}
              onOpenChange={setIsDateCalendarOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                  onClick={() => setIsDateCalendarOpen(true)}
                >
                  {selectedDate
                    ? format(selectedDate, "yyyy-MM-dd")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date ?? undefined);
                    setIsDateCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* EMPLOYEE FILTER */}
        {filterType === "employee" && (
          <div>
            <Label className="my-2">Employee ID</Label>
            <Select
              value={selectedEmployee}
              onValueChange={setSelectedEmployee}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employeeIds.map((id) => (
                  <SelectItem key={id} value={id}>
                    {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* DATE + TIME FILTER */}
        {filterType === "dateTime" && (
          <div className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover
                open={isDateTimeCalendarOpen}
                onOpenChange={setIsDateTimeCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                    onClick={() => setIsDateTimeCalendarOpen(true)}
                  >
                    {selectedDate
                      ? format(selectedDate, "yyyy-MM-dd")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date ?? undefined);
                      setIsDateTimeCalendarOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Check-In Time</Label>
              <Input
                type="time"
                placeholder="Select Check-In Time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-background appearance-none 
               [&::-webkit-calendar-picker-indicator]:hidden 
               [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
