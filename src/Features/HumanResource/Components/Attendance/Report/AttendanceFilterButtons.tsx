import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Attendance } from "@/Features/HumanResource/types";
import { AttendanceFilterDialog } from "./AttendanceFilterDialog";

type FilterType = "date" | "employee" | "dateTime" | null;

interface Props {
  attendanceList: Attendance[];
  onApplyFilter: (filtered: Attendance[]) => void;
}

const AttendanceFilterButtons = ({ attendanceList, onApplyFilter }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(null);

  const openFilter = (type: FilterType) => {
    setFilterType(type);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-start flex-wrap">
        <Button
          className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          onClick={() => openFilter("date")}
        >
          Date Wise Report
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          onClick={() => openFilter("employee")}
        >
          Employee Wise Report
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          onClick={() => openFilter("dateTime")}
        >
          Date and InTime Report
        </Button>
      </div>

      {filterType && (
        <AttendanceFilterDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          filterType={filterType}
          attendanceList={attendanceList}
          onApply={onApplyFilter}
        />
      )}
    </>
  );
};

export default AttendanceFilterButtons;
