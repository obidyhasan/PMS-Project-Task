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
import { useState } from "react";
import type { IHoliday } from "@/Features/HumanResource/types";
import DeleteHolidayDialog from "./DeleteHolidayDialog";
import { selectHolidays } from "@/Features/HumanResource/featuresSlices/Leave/holidaySlice";
import EditHolidayDialog from "./EditHolidayDialog";

interface HolidayTableProps {
  isManageEnable?: boolean;
}

const HolidayTable = ({ isManageEnable }: HolidayTableProps) => {
  const holidays = useSelector(selectHolidays);
  const [selectedHoliday, setSelectedHoliday] = useState<IHoliday | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border rounded-sm mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Holiday Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Number Of Days</TableHead>
            {isManageEnable && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {holidays?.map((holiday, idx) => (
            <TableRow key={holiday.id}>
              <TableCell className="py-4">{idx + 1}</TableCell>
              <TableCell>{holiday?.holidayName}</TableCell>
              <TableCell>{holiday?.fromDate}</TableCell>
              <TableCell>{holiday?.toDate}</TableCell>
              <TableCell>{holiday?.numberOfDays}</TableCell>
              {isManageEnable && (
                <TableCell className="flex gap-2 ">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      setSelectedHoliday(holiday);
                      setIsEditOpen(true);
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  <DeleteHolidayDialog id={holiday?.id as string} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {holidays?.length === 0 && (
        <div className="text-center text-sm p-2 bg-muted">
          <span>No data available in table</span>
        </div>
      )}

      {selectedHoliday && (
        <EditHolidayDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          holiday={{
            ...selectedHoliday,
          }}
        />
      )}
    </div>
  );
};

export default HolidayTable;
