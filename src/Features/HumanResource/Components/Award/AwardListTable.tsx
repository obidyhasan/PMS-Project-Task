import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdModeEdit } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import type { IAward } from "@/Features/HumanResource/types";
import { setSearchQuery } from "@/Features/HumanResource/featuresSlices/Award/awardListSlice";
import { sortByKey } from "@/Features/HumanResource/utils/attendance";
import ShowEntries from "@/Features/HumanResource/utils/shared/ShowEntries";
import Pagination from "@/Features/HumanResource/utils/shared/Pagination";
import { selectAwards } from "../../featuresSlices/Award/awardListSlice";
import EditAwardDialog from "./EditAwardDialog";
import DeleteAwardDialog from "./DeleteAwardDialog";

interface Props {
  isManageEnable?: boolean;
  filteredList?: IAward[] | null;
}

const AwardListTable = ({ isManageEnable, filteredList }: Props) => {
  const dispatch = useDispatch();
  const awards = useSelector(selectAwards);
  const listToShow = filteredList ?? awards;

  const [selectedAward, setSelectedAward] = useState<IAward | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key?: keyof IAward;
    direction: "asc" | "desc";
  }>({
    key: undefined,
    direction: "asc",
  });

  const handleSort = (key: keyof IAward) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = useMemo(() => {
    if (!sortConfig.key) return listToShow;
    return sortByKey(listToShow, sortConfig.key, sortConfig.direction);
  }, [listToShow, sortConfig]);

  return (
    <div>
      <div className="my-5 flex items-center justify-between flex-wrap gap-3">
        <ShowEntries />
        <div className="flex items-center gap-2 font-normal">
          <p>Search</p>
          <Input
            type="text"
            className="min-w-32"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              {[
                { label: "Award Name", key: "award" as keyof IAward },
                {
                  label: "Award Description",
                  key: "description" as keyof IAward,
                },
                { label: "Gift Item", key: "giftItem" as keyof IAward },
                { label: "Date", key: "date" as keyof IAward },
                { label: "Employee Name", key: "employeeName" as keyof IAward },
                { label: "Award By", key: "awardBy" as keyof IAward },
              ].map((col) => (
                <TableHead key={col.key}>
                  <div
                    className="flex items-center justify-between gap-2 cursor-pointer"
                    onClick={() => handleSort(col.key)}
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
                </TableHead>
              ))}
              {isManageEnable && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="py-4">{idx + 1}</TableCell>
                <TableCell>{item.award}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.giftItem}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.employeeName}</TableCell>
                <TableCell>{item.awardBy}</TableCell>
                {isManageEnable && (
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedAward(item);
                        setIsEditOpen(true);
                      }}
                    >
                      <MdModeEdit />
                    </Button>

                    <DeleteAwardDialog id={item.id as string} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sorted.length === 0 && (
          <div className="text-center text-sm p-2 bg-muted">
            <span>No data available in table</span>
          </div>
        )}

        {selectedAward && (
          <EditAwardDialog
            open={isEditOpen}
            setOpen={() => setIsEditOpen(false)}
            awardData={selectedAward}
          />
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default AwardListTable;
