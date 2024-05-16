import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export const DecisionOptions = () => {
  return (
    <div
      className={
        "divide-y divide-gray-100 overflow-hidden  bg-white/80 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      }
    >
      <Link href={"/decisions/movies"} className={"w-full"}>
        <div
          key={"decision-option-movies"}
          className="relative flex justify-between gap-x-6 px-4 py-5 transition-all duration-500 ease-in-out hover:bg-gray-50 sm:px-6"
        >
          <div className="flex min-w-0 items-center gap-x-4 text-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 text-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <div className="min-w-0 flex-auto">
              <p className="text-base font-semibold leading-6 text-blue">
                Movies
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-blue"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
