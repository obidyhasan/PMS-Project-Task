import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { useAppDispatch } from "@/Redux/hooks";
import { deleteWeeklyHoliday } from "@/Features/HumanResource/featuresSlices/Leave/WeeklyHolidaySlice";

const DeleteWeeklyHolidayDialog = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteWeeklyHoliday(id));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MdDeleteOutline />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete weekly
            holiday data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWeeklyHolidayDialog;
