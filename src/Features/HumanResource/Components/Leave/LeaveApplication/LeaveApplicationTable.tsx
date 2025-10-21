import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import ShowEntries from "@/Features/HumanResource/utils/shared/ShowEntries";
import Pagination from "@/Features/HumanResource/utils/shared/Pagination";
import { sortByKey } from "@/Features/HumanResource/utils/attendance";
import type { ILeaveApplication } from "@/Features/HumanResource/types";
import {
  selectLeaveApplications,
  selectLeaveApplicationSearchQuery,
  setLeaveApplicationSearchQuery,
} from "@/Features/HumanResource/featuresSlices/Leave/leaveApplicationSlice";
import DeleteLeaveApplicationDialog from "./DeleteLeaveApplicationDialog";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import EditLeaveApplicationDialog from "./EditLeaveApplicationDialog";

interface Props {
  isManageEnable?: boolean;
  filteredList?: ILeaveApplication[] | null;
}

const LeaveApplicationTable = ({ isManageEnable, filteredList }: Props) => {
  const dispatch = useDispatch();
  const leaveApplications = useSelector(selectLeaveApplications);
  const searchQuery = useSelector(selectLeaveApplicationSearchQuery);
  const listToShow =
    filteredList ??
    leaveApplications.filter(
      (leave) =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const [selectedLeaveApplication, setSelectedLeaveApplication] =
    useState<ILeaveApplication | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key?: keyof ILeaveApplication;
    direction: "asc" | "desc";
  }>({ key: undefined, direction: "asc" });

  const handleSort = (key: keyof ILeaveApplication) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = useMemo(() => {
    if (!sortConfig.key) return listToShow;
    return sortByKey(listToShow, sortConfig.key, sortConfig.direction);
  }, [listToShow, sortConfig]);

  return (
    <div>
      {/* Action Section */}
      <div className="my-5 flex items-center justify-between flex-wrap gap-3">
        <ShowEntries />
        <div className="flex items-center gap-2 font-normal">
          <p>Search</p>
          <Input
            type="text"
            className="min-w-32"
            value={searchQuery}
            onChange={(e) =>
              dispatch(setLeaveApplicationSearchQuery(e.target.value))
            }
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              {[
                { label: "Name", key: "name" as keyof ILeaveApplication },
                {
                  label: "Leave Type",
                  key: "leaveType" as keyof ILeaveApplication,
                },
                {
                  label: "Application Start Date",
                  key: "applicationStartDate" as keyof ILeaveApplication,
                },
                {
                  label: "Application end Date",
                  key: "applicationEndDate" as keyof ILeaveApplication,
                },
                {
                  label: "Approve Start Date",
                  key: "approveStartDate" as keyof ILeaveApplication,
                },
                {
                  label: "Approved End Date",
                  key: "approvedEndDate" as keyof ILeaveApplication,
                },
                {
                  label: "Apply Day",
                  key: "applyDay" as keyof ILeaveApplication,
                },
                {
                  label: "Approved Day",
                  key: "approvedDay" as keyof ILeaveApplication,
                },
              ].map((col) => (
                <TableHead key={col.key}>
                  <div
                    className="flex items-center justify-between gap-2 cursor-pointer"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <ArrowDownUp
                      className={`w-4 ${
                        sortConfig.key === col.key
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                </TableHead>
              ))}
              {isManageEnable && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((leave, idx) => (
              <TableRow key={leave.id}>
                <TableCell className="py-4">{idx + 1}</TableCell>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.applicationStartDate}</TableCell>
                <TableCell>{leave.applicationEndDate}</TableCell>
                <TableCell>{leave.approveStartDate}</TableCell>
                <TableCell>{leave.approvedEndDate}</TableCell>
                <TableCell>{leave.applyDay}</TableCell>
                <TableCell>{leave.approvedDay}</TableCell>
                {isManageEnable && (
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedLeaveApplication(leave);
                        setIsEditOpen(true);
                      }}
                    >
                      <MdModeEdit />
                    </Button>
                    <DeleteLeaveApplicationDialog id={leave.id!} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sorted.length === 0 && (
          <div className="text-center text-sm p-2 bg-muted">
            No data available in table
          </div>
        )}

        {selectedLeaveApplication && (
          <EditLeaveApplicationDialog
            open={isEditOpen}
            setOpen={() => setIsEditOpen(false)}
            leaveData={selectedLeaveApplication}
          />
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default LeaveApplicationTable;
