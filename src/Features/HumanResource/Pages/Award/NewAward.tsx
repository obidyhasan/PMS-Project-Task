import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddNewAwardDialog from "../../Components/Award/AddNewAwardDialog";
import AwardListTable from "../../Components/Award/AwardListTable";

const NewAward = () => {
  const [isAwardManageEnable, setIsAwardManageEnable] = useState(false);

  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="border-b pb-4 flex items-center gap-3 justify-between flex-wrap">
        <h1 className="font-medium text-xl">Award List</h1>
        <div className="flex gap-2 items-center justify-start flex-wrap">
          <AddNewAwardDialog />
          <Button
            onClick={() => setIsAwardManageEnable(!isAwardManageEnable)}
            className="bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Manage Award
          </Button>
        </div>
      </div>

      {/* Show Data Section */}
      <div>
        <AwardListTable isManageEnable={isAwardManageEnable} />
      </div>
    </div>
  );
};

export default NewAward;
