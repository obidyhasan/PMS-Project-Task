import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import DeleteWeeklyHolidayDialog from "./DeleteWeeklyHolidayDialog";
import { selectWeeklyHolidays } from "@/Features/HumanResource/featuresSlices/Leave/WeeklyHolidaySlice";
import { useState } from "react";
import type { IWeeklyHoliday } from "@/Features/HumanResource/types";
import EditWeeklyHolidayDialog from "./EditWeeklyHolidayDialog";

const WeeklyHolidayTable = () => {
  const holidays = useSelector(selectWeeklyHolidays);
  const [selectedWeeklyHoliday, setSelectedWeeklyHoliday] =
    useState<IWeeklyHoliday | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border rounded-sm mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Weekly Leave Day</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {holidays?.map((holiday, idx) => (
            <TableRow key={holiday.id}>
              <TableCell className="py-4">{idx + 1}</TableCell>
              <TableCell>{holiday?.day}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => {
                    setSelectedWeeklyHoliday(holiday);
                    setIsEditOpen(true);
                  }}
                >
                  <MdModeEdit />
                </Button>
                <DeleteWeeklyHolidayDialog id={holiday?.id as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {holidays?.length === 0 && (
        <div className="text-center text-sm p-2 bg-muted">
          <span>No data available in table</span>
        </div>
      )}

      {selectedWeeklyHoliday && (
        <EditWeeklyHolidayDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          holiday={{
            ...selectedWeeklyHoliday,
          }}
        />
      )}
    </div>
  );
};

export default WeeklyHolidayTable;
