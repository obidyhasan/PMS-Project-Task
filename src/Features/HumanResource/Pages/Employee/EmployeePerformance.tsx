import { Button } from "@/components/ui/button";
import AddPerformanceDialog from "../../Components/Employee/Performance/AddPerformanceDialog";
import { useState } from "react";
import EmployeePerformanceTable from "../../Components/Employee/Performance/EmployeePerformanceTable";

const EmployeePerformance = () => {
  const [isManageEnable, setIsManageEnable] = useState(false);

  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="font-medium text-xl">Employee Performance</h1>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <AddPerformanceDialog />
          <Button
            onClick={() => setIsManageEnable(!isManageEnable)}
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Manage Performance
          </Button>
        </div>
      </div>
      {/* Show Data Section */}
      <div>
        <EmployeePerformanceTable isManageEnable={isManageEnable} />
      </div>
    </div>
  );
};

export default EmployeePerformance;
