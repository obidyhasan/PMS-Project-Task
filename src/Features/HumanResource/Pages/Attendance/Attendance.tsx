import { Button } from "@/components/ui/button";
import AttendanceListTable from "../../Components/Attendance/AttendanceListTable";
import { useState } from "react";
import AddSingleCheckInDialog from "../../Components/Attendance/AddSingleCheckInDialog";

const Attendance = () => {
  const [isManageEnable, setIsManageEnable] = useState(false);

  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="border-b pb-4 flex items-center gap-3 justify-between flex-wrap">
        <h1 className="font-medium text-xl">Attendance List</h1>
        <div className="flex gap-2 items-center justify-start flex-wrap">
          <AddSingleCheckInDialog />
          <Button
            onClick={() => setIsManageEnable(!isManageEnable)}
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Manage Attendance
          </Button>
        </div>
      </div>

      {/* Show Data Section */}
      <div>
        <AttendanceListTable isManageEnable={isManageEnable} />
      </div>
    </div>
  );
};

export default Attendance;
