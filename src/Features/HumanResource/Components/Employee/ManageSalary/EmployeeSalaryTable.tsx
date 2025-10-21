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
import {
  selectEmployeeSalaries,
  setEmployeeSalarySearchQuery,
} from "../../../featuresSlices/Employee/employeeSalarySlice";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import { useState, useMemo } from "react";
import type { EmployeeSalary } from "../../../types";
import EditEmployeeSalaryDialog from "./EditEmployeeSalaryDialog";
import { ArrowDownUp } from "lucide-react";
import ShowEntries from "@/Features/HumanResource/utils/shared/ShowEntries";
import Pagination from "@/Features/HumanResource/utils/shared/Pagination";

const columns: { key: keyof EmployeeSalary | null; label: string }[] = [
  { key: "employeeId", label: "SL" },
  { key: "managePerformance", label: "Manage Performance" },
  { key: "employeeId", label: "Employee Id" },
  { key: "totalSalary", label: "Total Salary" },
  { key: "workingHour", label: "Working Hour" },
  { key: "workingPeriod", label: "Working Period" },
  { key: "paymentType", label: "Payment Type" },
  { key: "date", label: "Date" },
  { key: "paidBy", label: "Paid By" },
  { key: null, label: "Action" },
];

const EmployeeSalaryTable = () => {
  const dispatch = useDispatch();
  const employeeSalaries = useSelector(selectEmployeeSalaries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<EmployeeSalary | null>(
    null
  );

  const [sortConfig, setSortConfig] = useState<{
    key: keyof EmployeeSalary | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleEditClick = (salary: EmployeeSalary) => {
    setSelectedRowData(salary);
    setIsDialogOpen(true);
  };

  const handleSort = (column: keyof EmployeeSalary) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        return {
          key: column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: column, direction: "asc" };
    });
  };

  const sortedSalaries = useMemo(() => {
    if (!sortConfig.key) return employeeSalaries;

    return [...employeeSalaries].sort((a, b) => {
      const key = sortConfig.key as keyof EmployeeSalary;
      const aVal = a[key];
      const bVal = b[key];

      // Convert totalSalary to number when sorting
      if (key === "totalSalary") {
        return sortConfig.direction === "asc"
          ? Number(aVal) - Number(bVal)
          : Number(bVal) - Number(aVal);
      }

      // Default string comparison for other fields
      return sortConfig.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [employeeSalaries, sortConfig]);

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
            onChange={(e) =>
              dispatch(setEmployeeSalarySearchQuery(e.target.value))
            }
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.label}>
                  {col.key ? (
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer"
                      onClick={() => col.key && handleSort(col.key)}
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
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedSalaries?.map((item, idx) => (
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

        {sortedSalaries?.length === 0 && (
          <div className="text-center text-sm p-2 bg-muted">
            <span>No data available in table</span>
          </div>
        )}

        {selectedRowData && (
          <EditEmployeeSalaryDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            salary={selectedRowData}
          />
        )}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default EmployeeSalaryTable;
