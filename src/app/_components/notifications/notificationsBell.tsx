import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { BellIcon } from "@heroicons/react/24/outline";

export const NotificationsBell = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"ghost"}
          className="relative rounded-full  px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-6 mt-2 w-80 border-0 bg-white p-3">
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-bold text-blue">
              No New Notifications
            </h3>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
