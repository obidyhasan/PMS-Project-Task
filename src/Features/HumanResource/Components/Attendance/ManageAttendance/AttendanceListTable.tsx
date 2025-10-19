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

import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import type { Attendance } from "@/Features/HumanResource/types";
import {
  selectAttendances,
  setSearchQuery,
} from "@/Features/HumanResource/featuresSlices/Attendance/attendanceListSlice";
import { sortByKey } from "@/Features/HumanResource/utils/attendance";
import DeleteAttendanceDialog from "./DeleteAttendanceDialog";
import EditAttendanceDialog from "./EditAttendanceDialog";

interface AttendanceListTableProps {
  isManageEnable?: boolean;
  filteredList?: Attendance[] | null;
}

const AttendanceListTable = ({
  isManageEnable,
  filteredList,
}: AttendanceListTableProps) => {
  const dispatch = useDispatch();
  const attendanceList = useSelector(selectAttendances);

  const listToShow = filteredList ?? attendanceList;

  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key?: keyof Attendance;
    direction: "asc" | "desc";
  }>({ key: undefined, direction: "asc" });

  const handleSort = (key: keyof Attendance) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedAttendanceList = useMemo(() => {
    if (!sortConfig.key) return listToShow;
    return sortByKey(listToShow, sortConfig.key, sortConfig.direction);
  }, [listToShow, sortConfig]);

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
          <Input
            type="text"
            className="min-w-32"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                { label: "SL", key: "id" as keyof Attendance },
                { label: "Name", key: "name" as keyof Attendance },
                { label: "ID", key: "employeeId" as keyof Attendance },
                { label: "Date", key: "date" as keyof Attendance },
                { label: "Check In", key: "checkIn" as keyof Attendance },
                { label: "Check Out", key: "checkOut" as keyof Attendance },
                { label: "Stay", key: "stay" as keyof Attendance },
              ].map((col) => (
                <TableHead key={col.key}>
                  <div
                    className="flex items-center justify-between gap-2 cursor-pointer"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <ArrowDownUp className="text-muted-foreground w-4" />
                  </div>
                </TableHead>
              ))}

              {isManageEnable && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedAttendanceList.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="py-4">{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.employeeId}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.checkIn}</TableCell>
                <TableCell>{item.checkOut || "N/A"}</TableCell>
                <TableCell>{item.stay || "N/A"}</TableCell>
                {isManageEnable && (
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedAttendance(item);
                        setIsEditOpen(true);
                      }}
                    >
                      <MdModeEdit />
                    </Button>
                    <DeleteAttendanceDialog id={item.id as string} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sortedAttendanceList.length === 0 && (
          <div className="text-center text-sm p-2 bg-muted">
            <span>No data available in table</span>
          </div>
        )}

        {selectedAttendance && (
          <EditAttendanceDialog
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            attendance={selectedAttendance}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 justify-end flex-wrap my-5">
        <Button variant="ghost" className="bg-muted hover:bg-gray-200">
          Previous
        </Button>
        <Button size="icon" variant="outline">
          1
        </Button>
        <Button variant="ghost" className="bg-muted hover:bg-gray-200">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AttendanceListTable;
