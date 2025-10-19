import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAttendances } from "../../featuresSlices/Attendance/attendanceListSlice";
import type { Attendance } from "../../types";
import AttendanceFilterButtons from "../../Components/Attendance/Report/AttendanceFilterButtons";
import AttendanceListTable from "../../Components/Attendance/ManageAttendance/AttendanceListTable";

const AttendanceReport = () => {
  const attendanceList = useSelector(selectAttendances);
  const [filteredAttendance, setFilteredAttendance] = useState<
    Attendance[] | null
  >(null);

  return (
    <div className="p-4">
      <div className="border-b pb-4 flex items-center gap-3 justify-between flex-wrap">
        <h1 className="font-medium text-xl">Report</h1>
        <AttendanceFilterButtons
          attendanceList={attendanceList}
          onApplyFilter={setFilteredAttendance}
        />
      </div>

      <AttendanceListTable
        isManageEnable={false}
        filteredList={filteredAttendance}
      />
    </div>
  );
};

export default AttendanceReport;
