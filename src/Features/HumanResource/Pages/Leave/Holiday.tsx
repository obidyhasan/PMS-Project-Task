import { Button } from "@/components/ui/button";
import HolidayTable from "../../Components/Leave/Holiday/HolidayTable";
import { useState } from "react";
import AddHolidayDialog from "../../Components/Leave/Holiday/AddHolidayDialog";

const Holiday = () => {
  const [isManageEnable, setIsManageEnable] = useState(false);

  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="font-medium text-xl">Holiday</h1>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <AddHolidayDialog />
          <Button
            onClick={() => setIsManageEnable(!isManageEnable)}
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Manage Holiday
          </Button>
        </div>
      </div>
      {/* Show Data Section */}
      <div>
        <HolidayTable isManageEnable={isManageEnable} />
      </div>
    </div>
  );
};

export default Holiday;
