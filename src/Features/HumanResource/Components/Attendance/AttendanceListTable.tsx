import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import { selectAttendances } from "../../featuresSlices/Attendance/attendanceListSlice";
import { useSelector } from "react-redux";
import DeleteAttendanceDialog from "./DeleteAttendanceDialog";
import EditAttendanceDialog from "./EditAttendanceDialog";
import { useState } from "react";
import type { Attendance } from "../../types";

interface AttendanceListTableProps {
  isManageEnable?: boolean;
}

const AttendanceListTable = ({ isManageEnable }: AttendanceListTableProps) => {
  const attendanceList = useSelector(selectAttendances);

  const [selectedAttendanceList, setSelectedAttendanceList] =
    useState<Attendance | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      {/* Action Section */}
      <div className="my-5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 font-normal">
          <p>Show</p>
          <Input type="number" placeholder="10" className="max-w-16" />
          <p>entries</p>
        </div>
        <div className="flex items-center gap-2 font-normal">
          <p>Search</p>
          <Input type="text" className="min-w-32" />
        </div>
      </div>
      {/* Table Section */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Stay</TableHead>
              {isManageEnable && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceList?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-4">{idx + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.employeeId}</TableCell>
                <TableCell>{item?.date}</TableCell>
                <TableCell>{item?.checkIn}</TableCell>
                <TableCell>{item?.checkOut || `N/A`}</TableCell>
                <TableCell>{item?.stay || `N/A`}</TableCell>
                {isManageEnable && (
                  <TableCell className="flex gap-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        setSelectedAttendanceList(item);
                        setIsEditOpen(true);
                      }}
                    >
                      <MdModeEdit />
                    </Button>
                    <DeleteAttendanceDialog id={item?.id as string} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedAttendanceList && (
          <EditAttendanceDialog
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            attendance={{
              ...selectedAttendanceList,
            }}
          />
        )}
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2 justify-end flex-wrap my-5">
        <Button variant={"ghost"} className="bg-muted hover:bg-gray-200">
          Previous
        </Button>
        <Button size={"icon"} variant={"outline"}>
          1
        </Button>
        <Button variant={"ghost"} className="bg-muted hover:bg-gray-200">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AttendanceListTable;
