import AddLeaveTypeDialog from "../../Components/Leave/LeaveType/AddLeaveTypeDialog";
import LeaveTypeTable from "../../Components/Leave/LeaveType/LeaveTypeTable";

const LeaveType = () => {
  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="font-medium text-xl">Leave Type</h1>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <AddLeaveTypeDialog />
        </div>
      </div>
      {/* Show Data Section */}
      <div>
        <LeaveTypeTable />
      </div>
    </div>
  );
};

export default LeaveType;
