import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { selectEmployeeSalaries } from "../../featuresSlices/Employee/employeeSalarySlice";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import type { EmployeeSalary } from "../../types";
import EditEmployeeSalaryDialog from "./EditEmployeeSalaryDialog";

const EmployeeSalaryTable = () => {
  const employeeSalaries = useSelector(selectEmployeeSalaries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<EmployeeSalary | null>(
    null
  );

  const handleEditClick = (salary: EmployeeSalary) => {
    setSelectedSalary(salary);
    setIsDialogOpen(true);
  };

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
              <TableHead>Manage Performance</TableHead>
              <TableHead>Employee Id</TableHead>
              <TableHead>Total Salary</TableHead>
              <TableHead>Working Hour</TableHead>
              <TableHead>Working Period</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Paid By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeSalaries?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-4">{idx + 1}</TableCell>
                <TableCell>{item?.managePerformance}</TableCell>
                <TableCell>{item?.employeeId}</TableCell>
                <TableCell>{item?.totalSalary}</TableCell>
                <TableCell>{item?.workingHour}</TableCell>
                <TableCell>{item?.workingPeriod}</TableCell>
                <TableCell>{item?.paymentType}</TableCell>
                <TableCell>{item?.date}</TableCell>
                <TableCell>{item?.paidBy}</TableCell>
                <TableCell>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => handleEditClick(item)}
                  >
                    <MdModeEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedSalary && (
          <EditEmployeeSalaryDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            salary={selectedSalary}
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

export default EmployeeSalaryTable;
