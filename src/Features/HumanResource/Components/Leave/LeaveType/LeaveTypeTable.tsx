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
import type { ILeaveType } from "@/Features/HumanResource/types";
import DeleteLeaveTypeDialog from "./DeleteLeaveTypeDialog";
import EditLeaveTypeDialog from "./EditLeaveTypeDialog";
import { selectLeaveTypes } from "@/Features/HumanResource/featuresSlices/Leave/leaveTypeSlice";

const LeaveTypeTable = () => {
  const leaveTypes = useSelector(selectLeaveTypes);
  const [selectedLeaveType, setSelectedLeaveType] = useState<ILeaveType | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border rounded-sm mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Total Leave Days</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leaveTypes?.map((leaveType, idx) => (
            <TableRow key={leaveType.id}>
              <TableCell className="py-4">{idx + 1}</TableCell>
              <TableCell>{leaveType?.leaveType}</TableCell>
              <TableCell>{leaveType?.leaveDays}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => {
                    setSelectedLeaveType(leaveType);
                    setIsEditOpen(true);
                  }}
                >
                  <MdModeEdit />
                </Button>
                <DeleteLeaveTypeDialog id={leaveType?.id as string} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {leaveTypes?.length === 0 && (
        <div className="text-center text-sm p-2 bg-muted">
          <span>No data available in table</span>
        </div>
      )}

      {selectedLeaveType && (
        <EditLeaveTypeDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          leave={{
            ...selectedLeaveType,
          }}
        />
      )}
    </div>
  );
};

export default LeaveTypeTable;
