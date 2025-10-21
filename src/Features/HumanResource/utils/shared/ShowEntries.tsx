import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShowEntries = () => {
  return (
    <div className="flex items-center gap-1 font-normal">
      <p>Show</p>
      <Select defaultValue="10">
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <p>entries</p>
    </div>
  );
};

export default ShowEntries;
