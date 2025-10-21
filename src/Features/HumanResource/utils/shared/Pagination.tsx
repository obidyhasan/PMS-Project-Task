import { Button } from "@/components/ui/button";

const Pagination = () => {
  return (
    <div className="flex items-center gap-2 justify-end flex-wrap my-5">
      <Button variant={"ghost"} className="bg-muted hover:bg-gray-200">
        Previous
      </Button>
      <Button size={"icon"} variant={"outline"}>
        1
      </Button>
      <Button variant={"ghost"} className="bg-muted hover:bg-gray-200">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
