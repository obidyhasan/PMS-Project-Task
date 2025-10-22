import AddWeeklyHolidayDialog from "../../Components/Leave/WeeklyHoliday/AddWeeklyHolidayDialog";
import WeeklyHolidayTable from "../../Components/Leave/WeeklyHoliday/WeeklyHolidayTable";

const WeeklyHoliday = () => {
  return (
    <div className="p-4">
      {/* Headline Section */}
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="font-medium text-xl">Add Weekly Leave</h1>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          <AddWeeklyHolidayDialog />
        </div>
      </div>
      {/* Show Data Section */}
      <div>
        <WeeklyHolidayTable />
      </div>
    </div>
  );
};

export default WeeklyHoliday;
