import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAward } from "@/Features/HumanResource/featuresSlices/Award/awardListSlice";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { IAward } from "@/Features/HumanResource/types";
import { awardSchema } from "../../utils/schema/awardSchema";

interface EditAwardDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  awardData: IAward | null;
}

const EditAwardDialog = ({
  open,
  setOpen,
  awardData,
}: EditAwardDialogProps) => {
  const dispatch = useDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof awardSchema>>({
    resolver: zodResolver(awardSchema),
    defaultValues: awardData || {
      id: "",
      award: "",
      description: "",
      giftItem: "",
      date: "",
      employeeName: "",
      awardBy: "",
    },
  });

  useEffect(() => {
    if (awardData) {
      form.reset(awardData);
    }
  }, [awardData, form]);

  const onSubmit = (values: z.infer<typeof awardSchema>) => {
    dispatch(
      updateAward({
        id: awardData?.id as string,
        updatedData: {
          award: values.award,
          description: values.description,
          giftItem: values.giftItem,
          date: values.date,
          employeeName: values.employeeName,
          awardBy: values.awardBy,
        },
      })
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Award</DialogTitle>
          <DialogDescription>
            Update the details of the selected award.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Award Name */}
            <FormField
              control={form.control}
              name="award"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Award Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter award name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gift Item */}
            <FormField
              control={form.control}
              name="giftItem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gift Item</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter gift item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="pointer-events-none">Date</FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : ""
                          );
                          setIsCalendarOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee Name */}
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter employee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Award By */}
            <FormField
              control={form.control}
              name="awardBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Awarded By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter who gave the award" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAwardDialog;
