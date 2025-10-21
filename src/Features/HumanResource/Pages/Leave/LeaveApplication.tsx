import { Button } from "@/components/ui/button";
import { useState } from "react";
import LeaveApplicationTable from "../../Components/Leave/LeaveApplication/LeaveApplicationTable";
import AddLeaveApplicationDialog from "../../Components/Leave/LeaveApplication/AddLeaveApplicationDialog";

const LeaveApplication = () => {
  const [isLeaveApplicationManageEnable, setIsLeaveApplicationManageEnable] =
    useState(false);

  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="border-b pb-4 flex items-center gap-3 justify-between flex-wrap">
        <h1 className="font-medium text-xl">Leave Application</h1>
        <div className="flex gap-2 items-center justify-start flex-wrap">
          <AddLeaveApplicationDialog />
          <Button
            onClick={() =>
              setIsLeaveApplicationManageEnable(!isLeaveApplicationManageEnable)
            }
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Manage Application
          </Button>
        </div>
      </div>

      {/* Show Data Section */}
      <div>
        <LeaveApplicationTable
          isManageEnable={isLeaveApplicationManageEnable}
        />
      </div>
    </div>
  );
};

export default LeaveApplication;
