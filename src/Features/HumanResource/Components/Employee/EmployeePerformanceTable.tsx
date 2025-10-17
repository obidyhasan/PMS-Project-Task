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
import { selectEmployeePerformances } from "../../featuresSlices/Employee/employeeSlice";
import DeletePerformanceDialog from "./DeletePerformanceDialog";
import EditPerformanceDialog from "./EditPerformanceDialog";
import { useState } from "react";
import type { IEmployeePerformance } from "../../types";
import { Badge } from "@/components/ui/badge";

interface EmployeePerformanceTableProps {
  isManageEnable?: boolean;
}

const EmployeePerformanceTable = ({
  isManageEnable,
}: EmployeePerformanceTableProps) => {
  const performances = useSelector(selectEmployeePerformances);

  const [selectedPerformance, setSelectedPerformance] =
    useState<IEmployeePerformance | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border rounded-sm mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Manage Performance</TableHead>
            <TableHead>Employee Id</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Note By</TableHead>
            <TableHead>Number of Star</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated By</TableHead>
            {isManageEnable && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {performances.map((p, idx) => (
            <TableRow key={p.id}>
              <TableCell className="py-4">{idx + 1}</TableCell>
              <TableCell>{p?.managePerformance}</TableCell>
              <TableCell>{p?.employeeId}</TableCell>
              <TableCell>{p?.note}</TableCell>
              <TableCell>{p?.date}</TableCell>
              <TableCell>{p?.noteBy}</TableCell>
              <TableCell>{p?.numberOfStar}</TableCell>
              <TableCell>
                <Badge variant={"outline"}>{p?.status}</Badge>
              </TableCell>
              <TableCell>{p?.updatedBy}</TableCell>
              {isManageEnable && (
                <TableCell className="flex gap-2">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      setSelectedPerformance(p);
                      setIsEditOpen(true);
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                  <DeletePerformanceDialog id={p?.id} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPerformance && (
        <EditPerformanceDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          performance={{
            ...selectedPerformance,
          }}
        />
      )}
    </div>
  );
};

export default EmployeePerformanceTable;
